const express = require('express');
const router = express.Router();
const {
    getAllPayments,
    getUserPayments,
    getPaymentById,
    createPayment,
    updatePayment,
    deletePayment
} = require('../../controllers/admin/paymentController');
const {authenticateUser}=require("./../../middlewares/authenticate")
const {checkRole}=require("../../middlewares/authorize")

// Route to get all payments (Admin only)
router.get('/',authenticateUser, checkRole(['admin',  'freelancer']), getAllPayments);

// Route to get payments for a specific user (Freelancer or Client)
router.get('/user/payments', authenticateUser, checkRole(['admin', 'client', 'freelancer']),getUserPayments);

// Route to get a payment by ID (Admin or user who owns the payment)
router.get('/:id',authenticateUser, checkRole(['admin', 'client', 'freelancer']), getPaymentById);

// Route to create a payment (Admin only)
router.post('/', authenticateUser, checkRole(['admin', 'client', 'freelancer']),createPayment);

// Route to update a payment (Admin only)
router.put('/:id',authenticateUser, checkRole(['admin', 'freelancer']),updatePayment);

// Route to delete a payment (Admin only)
router.delete('/:id',authenticateUser, checkRole(['admin', 'freelancer']), deletePayment);

module.exports = router;
