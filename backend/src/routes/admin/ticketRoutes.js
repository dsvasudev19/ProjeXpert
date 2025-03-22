// routes/ticketRoutes.js
const express = require('express');
const router = express.Router();
const ticketController = require('./../../controllers/admin/ticketController');
const {authenticateUser}=require("./../../middlewares/authenticate")
const {checkRole}=require("./../../middlewares/authorize")
const { ticketUpload } = require('./../../utils/multer'); // Updated import


router.get("/:id",authenticateUser,ticketController.getTicketById)
// Public routes (authenticated users)
router.post('/',  authenticateUser, ticketUpload.array('file',10),ticketController.createTicket);
router.get('/my-tickets', authenticateUser, ticketController.getMyTickets);
router.post('/:ticketId/comments', authenticateUser, ticketController.addComment);
router.post('/:ticketId/attachments', authenticateUser, ticketUpload.single('file'), ticketController.addAttachment);

// Admin-only routes
router.get('/', authenticateUser, checkRole(['admin','client','freelancer']), ticketController.getAllTickets);


router.put('/:ticketId', authenticateUser, checkRole(['admin']), ticketController.updateTicket);

module.exports = router;