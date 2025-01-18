const { File } = require('../../models');
const path = require('path');
const fs = require('fs');

const uploadFile = async (req, res) => {
    console.log(req.file)
    try {
        const fileData = {
            name: req.file.originalname,
            type: req.file.mimetype,
            size: req.file.size,
            path: '/projectFile/'+req.file.filename,
            uploaderId: req.user.id,
            projectId: req.params.projectId,
            taskId: req.body.taskId
        };
        const file = await File.create(fileData);
        res.status(201).json(file);
    } catch (error) { console.log(error);
        res.status(400).json({ error: error.message });
    }
}
const downloadFile = async (req, res) => {
    try {
        const file = await File.findByPk(req.params.id);
        if (file) {
            const filePath = path.join(__dirname, '../../../../backend/uploads', file.path);
            res.download(filePath, file.name, (err) => {
                if (err) {
                    console.error('Error in downloading file:', err);
                    res.status(500).json({ message: 'Error in downloading file' });
                }
            });
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: error.message });
    }
};


const deleteFile = async (req, res) => {
    try {
        const file = await File.findByPk(req.params.id);
        if (file) {
            fs.unlinkSync(file.path);
            await file.destroy();
            res.status(204).send();
        } else {
            res.status(404).json({ message: 'File not found' });
        }
    } catch (error) { console.log(error);
        res.status(500).json({ error: error.message });
    }
}
const getFilesByProject = async (req, res) => {
    try {
        const files = await File.findAll({ where: { projectId: req.params.projectId } });
        res.status(200).json(files);
    } catch (error) { console.log(error);
        res.status(500).json({ error: error.message });
    }
}
const getFilesByTask = async (req, res) => {
    try {
        const files = await File.findAll({ where: { taskId: req.params.taskId } });
        res.json(files);
    } catch (error) { console.log(error);
        res.status(500).json({ error: error.message });
    }
}


module.exports={
    uploadFile,
    deleteFile,
    downloadFile,
    getFilesByProject,
    getFilesByTask
}