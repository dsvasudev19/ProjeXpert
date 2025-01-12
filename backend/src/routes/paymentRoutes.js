
const express = require('express');
const router = express.Router();
const {
    getPaymentById,
    createPayment,
    updatePayment,
    getUserPayments
} = require('../controllers/paymentController');
const {  authenticateUser } = require('../middlewares/authenticate');
const {  checkRole } = require('../middlewares/authorize');

// Route to get all payments for the authenticated user (Freelancer or Client)
router.get('/', authenticateUser, getUserPayments);

// Route to get a payment by ID (Admin can access any, others can access their own)
router.get('/:id', authenticateUser, getPaymentById);

// Route to create a payment (Admins only)
router.post('/', authenticateUser, checkRole(['admin']), createPayment);

// Route to update a payment (Admins only)
router.put('/:id', authenticateUser, checkRole(['admin']), updatePayment);

module.exports = router;
