// controllers/permissionController.js
const { Permission } = require('../../models');

// Create a new permission
const createPermission = async (req, res) => {
    try {
        const { name, description, resource, action } = req.body;
        const permission = await Permission.create({ name, description, resource, action });
        return res.status(201).json({ message: 'Permission created successfully.', permission });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Get all permissions
const getAllPermissions = async (req, res) => {
    try {
        const permissions = await Permission.findAll();
        return res.status(200).json(permissions);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Get permission by ID
const getPermissionById = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found.' });
        }
        return res.status(200).json(permission);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Update a permission
const updatePermission = async (req, res) => {
    try {
        const { name, description, resource, action } = req.body;
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found.' });
        }

        permission.name = name || permission.name;
        permission.description = description || permission.description;
        permission.resource = resource || permission.resource;
        permission.action = action || permission.action;

        await permission.save();
        return res.status(200).json({ message: 'Permission updated successfully.', permission });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Delete a permission
const deletePermission = async (req, res) => {
    try {
        const permission = await Permission.findByPk(req.params.id);
        if (!permission) {
            return res.status(404).json({ message: 'Permission not found.' });
        }

        await permission.destroy();
        return res.status(200).json({ message: 'Permission deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

module.exports = {
    createPermission,
    getAllPermissions,
    getPermissionById,
    updatePermission,
    deletePermission
};
