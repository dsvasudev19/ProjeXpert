const { ClientFeedback, Project } = require('../../models');

exports.createFeedback = async (req, res, next) => {
  try {
    const feedback = await ClientFeedback.create(req.body);
    res.status(201).json({
      success: true,
      message: 'Feedback created successfully',
      data: feedback
    });
  } catch (error) {
    next(error);
  }
};

exports.getAllFeedback = async (req, res, next) => {
  try {
    const feedbacks = await ClientFeedback.findAll({
      include: [{ model: Project, attributes: ['name'] }]
    });
    res.status(200).json({
      success: true,
      message: 'All feedback retrieved successfully',
      data: feedbacks
    });
  } catch (error) {
    next(error);
  }
};

exports.getFeedbackById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const feedback = await ClientFeedback.findByPk(id, {
      include: [{ model: Project, attributes: ['name'] }]
    });

    if (!feedback) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback retrieved successfully',
      data: feedback
    });
  } catch (error) {
    next(error);
  }
};

exports.updateFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const [updated] = await ClientFeedback.update(req.body, { where: { id } });

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
        data: null
      });
    }

    const updatedFeedback = await ClientFeedback.findByPk(id);
    res.status(200).json({
      success: true,
      message: 'Feedback updated successfully',
      data: updatedFeedback
    });
  } catch (error) {
    next(error);
  }
};

exports.deleteFeedback = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleted = await ClientFeedback.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: 'Feedback not found',
        data: null
      });
    }

    res.status(200).json({
      success: true,
      message: 'Feedback deleted successfully',
      data: null
    });
  } catch (error) {
    next(error);
  }
};
