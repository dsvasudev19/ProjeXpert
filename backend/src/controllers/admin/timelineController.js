const { sequelize, Meeting, Task,  Bug, MeetingParticipant ,User} = require('../../models');
const { Op } = require('sequelize');


const generateJitsiMeetingId = (title) => {
  const sanitizedTitle = title.replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
  const timestamp = new Date().getTime();
  return `${sanitizedTitle}-${timestamp}`;
};


class TimeController {
  /**
   * Get all events for the current user's calendar
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async getCalendarEvents(req, res) {
    try {
      const userId = req.user.id; // Assuming authentication middleware sets req.user
      const { start, end, type } = req.query;

      // Parse date range if provided
      const startDate = start ? new Date(start) : new Date();
      const endDate = end ? new Date(end) : new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1); // Default to 1 month range if not specified

      // Build filter conditions
      const timeFilter = {
        [Op.and]: [
          { startTime: { [Op.gte]: startDate } },
          { startTime: { [Op.lte]: endDate } }
        ]
      };

      // Get user's meetings
      const meetings = await Meeting.findAll({
        include: [
          {
            model: MeetingParticipant,
            where: { userId },
            required: true
          }
        ],
        where: type === 'meeting' || type === 'all' || !type ? timeFilter : { id: null }
      });

      // Get user's tasks
      const tasks = await Task.findAll({
        where: {
          assigneeId: userId,
          dueDate: {
            [Op.between]: [startDate, endDate]
          },
          ...(type === 'task' || type === 'all' || !type ? {} : { id: null })
        }
      });

      // Get user's bugs
      const bugs = await Bug.findAll({
        where: {
          assigneeId: userId,
          dueDate: {
            [Op.between]: [startDate, endDate]
          },
          ...(type === 'bug' || type === 'all' || !type ? {} : { id: null })
        }
      });

      // Format meetings into calendar events
      const meetingEvents = meetings.map(meeting => ({
        id: `meeting-${meeting.id}`,
        title: meeting.title,
        start: meeting.startTime,
        end: meeting.endTime,
        employeeId: userId,
        type: 'meeting',
        description: meeting.description,
        status: meeting.status,
        jitsiMeetingId: meeting.jitsiMeetingId,
        jitsiMeetingLink: meeting.jitsiMeetingLink,
      }));

      // Format tasks into calendar events
      const taskEvents = tasks.map(task => {
        const taskDate = new Date(task.dueDate);
        const taskEndDate = new Date(taskDate);
        taskEndDate.setHours(taskEndDate.getHours() + 2); // Default 2-hour duration for tasks
        
        return {
          id: `task-${task.id}`,
          title: task.title,
          start: taskDate,
          end: taskEndDate,
          employeeId: userId,
          type: 'task',
          description: task.description,
          status: task.status,
          priority: task.priority,
          progress: task.progress
        };
      });

      // Format bugs into calendar events
      const bugEvents = bugs.map(bug => {
        const bugDate = new Date(bug.dueDate);
        const bugEndDate = new Date(bugDate);
        bugEndDate.setHours(bugEndDate.getHours() + 1); // Default 1-hour duration for bugs
        
        return {
          id: `bug-${bug.id}`,
          title: `Bug: ${bug.title}`,
          start: bugDate,
          end: bugEndDate,
          employeeId: userId,
          type: 'bug',
          description: bug.description,
          status: bug.status,
          priority: bug.priority
        };
      });

      // Combine all events
      const allEvents = [...meetingEvents, ...taskEvents, ...bugEvents];

      return res.status(200).json({
        success: true,
        data: allEvents
      });
    } catch (error) {
      console.error('Error fetching calendar events:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch calendar events',
        error: error.message
      });
    }
  }

  /**
   * Get events for a specific employee
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async getEmployeeEvents(req, res) {
    try {
      const { employeeId } = req.params;
      const { start, end, type } = req.query;

      const startDate = start ? new Date(start) : new Date();
      const endDate = end ? new Date(end) : new Date(startDate);
      endDate.setMonth(endDate.getMonth() + 1);

      // Implement permission check and event fetching here if needed
      return res.status(200).json({
        success: true,
        data: [],
      });
    } catch (error) {
      console.error('Error fetching employee events:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to fetch employee events',
        error: error.message,
      });
    }
  }


  async getMeetingById(req, res, next) {
    try {
      const meeting = await Meeting.findByPk(req.params.id, {
        include: [
          {
            model: MeetingParticipant,
            include: [
              {
                model: User,
                attributes: ['id', 'name', 'email'],
              },
            ],
            attributes: ['id', 'userId'],
          },
        ],
      });
      if (meeting) {
        return res.status(200).json(meeting);
      }
      return res.status(404).json({ success: false, message: 'Meeting not found' });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }


  /**
   * Create a new meeting
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async createMeeting(req, res) {
    try {
      const { title, description, startTime, endTime, participants, roomName } = req.body;
      const createdBy = req.user.id;

      if (!title || !startTime || !endTime) {
        return res.status(400).json({
          success: false,
          message: 'Missing required fields',
        });
      }

      // Generate Jitsi details
      const jitsiMeetingId = generateJitsiMeetingId(title);
      const jitsiMeetingLink = `https://meet.jit.si/${jitsiMeetingId}`; // Adjust domain if using custom Jitsi server

      const meeting = await Meeting.create({
        title,
        description,
        startTime,
        endTime,
        createdBy,
        status: 'scheduled',
        roomName: roomName || jitsiMeetingId, // Use provided roomName or jitsiMeetingId
        jitsiMeetingId,
        jitsiMeetingLink,
      });

      if (participants && Array.isArray(participants)) {
        await Promise.all(participants.map(userId =>
          MeetingParticipant.create({
            meetingId: meeting.id,
            userId,
            status: 'invited',
          })
        ));
      }

      await MeetingParticipant.create({
        meetingId: meeting.id,
        userId: createdBy,
        status: 'accepted',
      });

      return res.status(201).json({
        success: true,
        message: 'Meeting created successfully',
        data: {
          id: meeting.id,
          title: meeting.title,
          startTime: meeting.startTime,
          endTime: meeting.endTime,
          jitsiMeetingLink: meeting.jitsiMeetingLink,
        },
      });
    } catch (error) {
      console.error('Error creating meeting:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to create meeting',
        error: error.message,
      });
    }
  }

  /**
   * Update a meeting
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async updateMeeting(req, res) {
    try {
      const { id } = req.params;
      const { title, description, startTime, endTime, participants, status } = req.body;
      const userId = req.user.id;

      const meeting = await Meeting.findByPk(id);
      if (!meeting) {
        return res.status(404).json({
          success: false,
          message: 'Meeting not found',
        });
      }

      if (meeting.createdBy !== userId) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to update this meeting',
        });
      }

      // Regenerate Jitsi details if title changes
      let jitsiMeetingId = meeting.jitsiMeetingId;
      let jitsiMeetingLink = meeting.jitsiMeetingLink;
      if (title && title !== meeting.title) {
        jitsiMeetingId = generateJitsiMeetingId(title);
        jitsiMeetingLink = `https://meet.jit.si/${jitsiMeetingId}`;
      }

      await meeting.update({
        title: title || meeting.title,
        description: description || meeting.description,
        startTime: startTime || meeting.startTime,
        endTime: endTime || meeting.endTime,
        status: status || meeting.status,
        jitsiMeetingId,
        jitsiMeetingLink,
      });

      if (participants && Array.isArray(participants)) {
        await MeetingParticipant.destroy({
          where: { meetingId: id },
        });

        await Promise.all(participants.map(userId =>
          MeetingParticipant.create({
            meetingId: id,
            userId,
            status: 'invited',
          })
        ));

        await MeetingParticipant.create({
          meetingId: id,
          userId: meeting.createdBy,
          status: 'accepted',
        });
      }

      return res.status(200).json({
        success: true,
        message: 'Meeting updated successfully',
        data: {
          id: meeting.id,
          title: meeting.title,
          startTime: meeting.startTime,
          endTime: meeting.endTime,
          jitsiMeetingLink: meeting.jitsiMeetingLink,
        },
      });
    } catch (error) {
      console.error('Error updating meeting:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to update meeting',
        error: error.message,
      });
    }
  }

  /**
   * Delete a meeting
   * @param {Request} req - Express request object
   * @param {Response} res - Express response object
   */
  async deleteMeeting(req, res) {
    try {
      const { id } = req.params;
      const userId = req.user.id;

      const meeting = await Meeting.findByPk(id);
      if (!meeting) {
        return res.status(404).json({
          success: false,
          message: 'Meeting not found',
        });
      }

      if (meeting.createdBy !== userId) {
        return res.status(403).json({
          success: false,
          message: 'You do not have permission to delete this meeting',
        });
      }

      await MeetingParticipant.destroy({
        where: { meetingId: id },
      });

      await meeting.destroy();

      return res.status(200).json({
        success: true,
        message: 'Meeting deleted successfully',
      });
    } catch (error) {
      console.error('Error deleting meeting:', error);
      return res.status(500).json({
        success: false,
        message: 'Failed to delete meeting',
        error: error.message,
      });
    }
  }
}

module.exports = new TimeController();