// controllers/ticketController.js
const { Ticket, TicketComment, TicketAttachment, TicketHistory, User, Project,Role } = require('../../models');
const { Op } = require('sequelize');

const ticketController = {
  // Create a new ticket
  async createTicket(req, res) {
    try {
        const { title, description, category, priority, projectId } = req.body;
        const userId = req.user.id;
        const files = req.files; // Array of uploaded files from multer

        // Create the ticket
        const ticket = await Ticket.create({
            title,
            description,
            category,
            priority,
            raisedBy: userId,
            projectId,
            status: 'Open' // Explicitly setting default value
        });

        // Handle file attachments if any
        if (files && files.length > 0) {
            const attachments = files.map(file => ({
                ticketId: ticket.id,
                uploadedBy: userId,
                fileName: file.originalname,
                fileType: file.mimetype,
                fileSize: file.size,
                filePath: file.path // Assuming multer saves file and provides path
            }));

            // Bulk create attachments
            await TicketAttachment.bulkCreate(attachments);
        }

        // Fetch the created ticket with associations
        const createdTicket = await Ticket.findByPk(ticket.id, {
            include: [
                { model: User, as: 'raiser', attributes: ['id', 'name'] },
                { model: User, as: 'assignee', attributes: ['id', 'name'] },
                { model: Project, as: 'project', attributes: ['id', 'name'] },
                { 
                    model: TicketAttachment, 
                    as: 'attachments', 
                    attributes: ['id', 'fileName', 'url', 'fileType', 'fileSize','filePath'] 
                }
            ]
        });

        res.status(201).json(createdTicket);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
},


  async getTicketById(req,res){
    try {
      const ticket = await Ticket.findByPk(req.params.id,{
        include: [
          { model: User, as: 'raiser', attributes: ['id', 'name'] },
          { model: User, as: 'assignee', attributes: ['id', 'name'] },
          { model: Project, attributes: ['id', 'name'], as: 'project' },
          { model: TicketAttachment, as: 'attachments', attributes: ['id', 'fileName', 'url','filePath'] },
          { model: TicketComment, as: "comments",include:[{model:User,as:'commenter'}] },
          { model:TicketHistory, as:"history"}
        ],
      });
      res.json(ticket);
    } catch (error) {
      console.log(error)
      res.status(200).json({error:error.message})
    }
  },

  // Get all tickets (admin view)
  async getAllTickets (req, res){
    try {
        const userId = req.user.id;

        // Fetch user with their role
        const user = await User.findOne({
            where: { id: userId },
            include: [{ model: Role }]
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const userRole = user.Roles[0].name;

        // Base condition: exclude resolved tickets
        let whereCondition = {
            status: {
                [Op.ne]: "Resolved"  // Assuming tickets have a "Resolved" status
            }
        };

        // Apply additional filters for non-admin users
        if (userRole !== 'admin') {
            whereCondition[Op.or] = [
                { assignedTo: userId },    // Tickets assigned to the user
                { raisedBy: userId }       // Tickets raised by the user
            ];
        }

        const tickets = await Ticket.findAll({
            where: whereCondition,
            include: [
                { 
                    model: User, 
                    as: 'raiser', 
                    attributes: ['id', 'name'] 
                },
                { 
                    model: User, 
                    as: 'assignee', 
                    attributes: ['id', 'name'] 
                },
                { 
                    model: Project, 
                    attributes: ['id', 'name'], 
                    as: 'project' 
                },
                { 
                    model: TicketAttachment, 
                    as: 'attachments', 
                    attributes: ['id', 'fileName', 'url'] 
                }
            ],
            order: [['createdAt', 'DESC']]
        });

        res.status(200).json(tickets);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
},

  // Get user's tickets
  async getMyTickets(req, res) {
    try {
      const tickets = await Ticket.findAll({
        where: { raisedBy: req.user.id },
        include: [
          { model: User, as: 'assignee', attributes: ['id', 'name'] },
          { model: Project, attributes: ['id', 'name'], as: "project" },
          { model: TicketAttachment, as: 'attachments', attributes: ['id', 'fileName', 'url'] },
          { model:TicketHistory, as:"history"}
        ],
      });
      res.json(tickets);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  },

  // Update ticket (admin only)
  async updateTicket(req, res) {
    try {
      const { ticketId } = req.params;
      const { status, assignedTo, resolution } = req.body;

      const ticket = await Ticket.findByPk(ticketId);
      if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

      const updates = {};
      if (status) updates.status = status;
      if (assignedTo) updates.assignedTo = assignedTo;
      if (resolution) {
        updates.resolution = resolution;
        updates.resolvedAt = status === 'Resolved' ? new Date() : null;
      }

      // Record history for each change
      for (const [field, newValue] of Object.entries(updates)) {
        await TicketHistory.create({
          ticketId,
          changedBy: req.user.id,
          fieldChanged: field,
          oldValue: ticket[field]?.toString(),
          newValue: newValue.toString(),
        });
      }

      await ticket.update(updates);
      res.json(ticket);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  },

  // Add comment to ticket
  async addComment(req, res) {
    try {
      const { ticketId } = req.params;
      const { content } = req.body;

      const comment = await TicketComment.create({
        ticketId,
        userId: req.user.id,
        content,
      });
      res.status(201).json(comment);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  },

  // Add attachment to ticket
  async addAttachment(req, res) {
    try {
      const { ticketId } = req.params;
      const file = req.file; // Handled by ticketUpload middleware

      if (!file) return res.status(400).json({ error: 'No file uploaded' });

      const ticket = await Ticket.findByPk(ticketId);
      if (!ticket) return res.status(404).json({ error: 'Ticket not found' });

      const attachment = await TicketAttachment.create({
        ticketId,
        uploadedBy: req.user.id,
        fileName: file.originalname,
        fileType: file.mimetype,
        fileSize: file.size,
        filePath: file.path.replace(/\\/g, "/"), // Normalize path for consistency
      });
      res.status(201).json(attachment);
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: error.message });
    }
  },
};

module.exports = ticketController;