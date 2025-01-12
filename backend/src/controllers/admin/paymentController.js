const { Payment, User, Project } = require('../../models'); // Adjust the path based on your project structure
const { Op } = require('sequelize');

const getAllPayments = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const payments = await Payment.findAll({
            include: [{ model: Project, as: 'Project' }],
        });

        return res.status(200).json(payments);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Get payments for a user (Freelancer or Client)
const getUserPayments = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const payments = await Payment.findAll({
            where: {
                [Op.or]: [{ clientId: userId }, { freelancerId: userId }],
            },
            include: [{ model: Project, as: 'Project' }],
        });

        return res.status(200).json(payments);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Get a payment by ID (Admin can access any, others can access their own)
const getPaymentById = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);
        const payment = await Payment.findByPk(req.params.id, {
            include: [{ model: Project, as: 'Project' }],
        });

        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }

        if (user.role !== 'admin' && payment.clientId !== userId && payment.freelancerId !== userId) {
            return res.status(403).json({ message: 'Access denied.' });
        }

        return res.status(200).json(payment);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Create a payment (Admins only)
const createPayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { amount, paymentDate, status, projectId } = req.body;

        const payment = await Payment.create({
            amount,
            paymentDate,
            status,
            projectId,
            clientId: userId, // Assuming the client is the one creating the payment
        });

        return res.status(201).json({ message: 'Payment created successfully.', payment });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Update a payment (Admins only)
const updatePayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const { amount, paymentDate, status } = req.body;
        const payment = await Payment.findByPk(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }

        payment.amount = amount || payment.amount;
        payment.paymentDate = paymentDate || payment.paymentDate;
        payment.status = status || payment.status;

        await payment.save();

        return res.status(200).json({ message: 'Payment updated successfully.', payment });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Delete a payment (Admins only)
const deletePayment = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId);

        if (!user || user.role !== 'admin') {
            return res.status(403).json({ message: 'Access denied. Admins only.' });
        }

        const payment = await Payment.findByPk(req.params.id);

        if (!payment) {
            return res.status(404).json({ message: 'Payment not found.' });
        }

        await payment.destroy();
        return res.status(200).json({ message: 'Payment deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}


module.exports = {
    getAllPayments,
    getUserPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
};
