// controllers/roleController.js
const { Role, Permission, User } = require('../../models');
const { Op } = require('sequelize');
// Create a new role
const createRole = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;
        const role = await Role.create({ name, description, isActive });
        const permissions = await Permission.findAll({where:{id:{[Op.in]:req.body.permissions}}})
        await role.setPermissions(permissions)
        await role.save()
        return res.status(201).json({ message: 'Role created successfully.', role });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Get all roles
const getAllRoles = async (req, res) => {
    try {
        const roles = await Role.findAll({
            include: [ { model: Permission, through: { attributes: [] } } ]  // Including associated permissions
        });
        return res.status(200).json(roles);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Get role by ID
const getRoleById = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id, {
            include: [ { model: Permission, through: { attributes: [] } } ]
        });
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }
        return res.status(200).json(role);
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Update a role
const updateRole = async (req, res) => {
    try {
        const { name, description, isActive } = req.body;
        const role = await Role.findByPk(req.params.id,{include:[{model:Permission}]});
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }
        role.name = name || role.name;
        role.description = description || role.description;
        role.isActive = isActive !== undefined ? isActive : role.isActive;
        const newPermissionsInstances=await Permission.findAll({where:{id:{[Op.in]:req.body.permissions}}})
        await role.setPermissions(newPermissionsInstances)  
        await role.save();
        return res.status(200).json({ message: 'Role updated successfully.', role });
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Delete a role
const deleteRole = async (req, res) => {
    try {
        const role = await Role.findByPk(req.params.id);
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }

        await role.destroy();
        return res.status(200).json({ message: 'Role deleted successfully.' });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

// Assign permissions to a role
const assignPermissionsToRole = async (req, res) => {
    try {
        const { roleId, permissionIds } = req.body;

        // Find the role
        const role = await Role.findByPk(roleId);
        if (!role) {
            return res.status(404).json({ message: 'Role not found.' });
        }

        // Find permissions
        const permissions = await Permission.findAll({
            where: {
                id: {
                    [Op.in]: permissionIds
                }
            }
        });

        if (permissions.length === 0) {
            return res.status(404).json({ message: 'Permissions not found.' });
        }

        // Assign permissions to the role
        await role.setPermissions(permissions);
        return res.status(200).json({ message: 'Permissions assigned successfully to role.', role });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
};

module.exports = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
    assignPermissionsToRole
};
