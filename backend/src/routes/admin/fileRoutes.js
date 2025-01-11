const express = require('express');
const router = express.Router();
const fileController = require('../../controllers/admin/fileController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

router.post('/upload', upload.single('file'), fileController.uploadFile);
router.get('/:id/download', fileController.downloadFile);
router.delete('/:id', fileController.deleteFile);
router.get('/project/:projectId', fileController.getFilesByProject);
router.get('/task/:taskId', fileController.getFilesByTask);

module.exports = router;
