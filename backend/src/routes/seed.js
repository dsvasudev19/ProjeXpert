// routes/seed.js
const express = require('express');
const router = express.Router();
const { Role, Permission } = require('../models');
const { authenticateUser } = require('../middlewares/authenticate');

router.post('/seed-roles-permissions', async (req, res) => {
  const roles = [
    { name: 'admin' },
    { name: 'ProjectManager' },
    { name: 'TeamLead' },
    { name: 'client' },
    { name: 'freelancer' },
    { name: 'TeamMember' }
  ];

  const permissions = [
    // User Management
    { name: 'create_users', description: 'Create new users' },
    { name: 'update_users', description: 'Update user information' },
    { name: 'delete_users', description: 'Delete users from the system' },
    { name: 'view_users', description: 'View user profiles and details' },
    
    // Project Management
    { name: 'create_projects', description: 'Create new projects' },
    { name: 'update_projects', description: 'Update project details' },
    { name: 'delete_projects', description: 'Delete projects' },
    { name: 'view_projects', description: 'View project details' },
    { name: 'assign_project_teams', description: 'Assign teams to projects' },
    
    // Team Management
    { name: 'create_teams', description: 'Create new teams' },
    { name: 'update_teams', description: 'Update team details' },
    { name: 'delete_teams', description: 'Delete teams' },
    { name: 'view_teams', description: 'View team details' },
    { name: 'add_team_members', description: 'Add members to teams' },
    { name: 'remove_team_members', description: 'Remove members from teams' },
    
    // Task Management
    { name: 'create_tasks', description: 'Create new tasks' },
    { name: 'update_tasks', description: 'Update task details' },
    { name: 'delete_tasks', description: 'Delete tasks' },
    { name: 'view_tasks', description: 'View task details' },
    { name: 'assign_tasks', description: 'Assign tasks to users' },
    { name: 'update_task_status', description: 'Update task status' },
    
    // Bug Management
    { name: 'create_bugs', description: 'Create new bugs' },
    { name: 'update_bugs', description: 'Update bug details' },
    { name: 'delete_bugs', description: 'Delete bugs' },
    { name: 'view_bugs', description: 'View bug details' },
    { name: 'approve_fixes', description: 'Approve bug fixes' },
    
    // File Management
    { name: 'upload_files', description: 'Upload new files' },
    { name: 'update_files', description: 'Update file details' },
    { name: 'delete_files', description: 'Delete files' },
    { name: 'view_files', description: 'View and download files' },
    
    // Payment Management
    { name: 'create_payments', description: 'Create payment transactions' },
    { name: 'update_payments', description: 'Update payment details' },
    { name: 'delete_payments', description: 'Delete payments' },
    { name: 'view_payments', description: 'View payment details' }
  ];

  try {
    // Create roles
    const createdRoles = await Promise.all(
      roles.map(async (roleData) => {
        return Role.findOrCreate({ where: roleData });
      })
    );

    // Create permissions
    const createdPermissions = await Promise.all(
      permissions.map(async (permissionData) => {
        return Permission.findOrCreate({ where: permissionData });
      })
    );

    const allPermissions = createdPermissions.map(([perm]) => perm);

    // Define role-specific permissions
    const rolePermissions = {
      admin: permissions.map(p => p.name), // All permissions
      
      ProjectManager: [
        'view_users',
        'create_projects', 'update_projects', 'delete_projects', 'view_projects', 'assign_project_teams',
        'create_teams', 'update_teams', 'delete_teams', 'view_teams', 'add_team_members', 'remove_team_members',
        'create_tasks', 'update_tasks', 'delete_tasks', 'view_tasks', 'assign_tasks', 'update_task_status',
        'create_bugs', 'update_bugs', 'delete_bugs', 'view_bugs', 'approve_fixes',
        'upload_files', 'update_files', 'delete_files', 'view_files',
        'view_payments'
      ],
      
      TeamLead: [
        'view_users',
        'view_projects',
        'view_teams', 'add_team_members', 'remove_team_members',
        'create_tasks', 'update_tasks', 'delete_tasks', 'view_tasks', 'assign_tasks', 'update_task_status',
        'create_bugs', 'update_bugs', 'delete_bugs', 'view_bugs',
        'upload_files', 'update_files', 'delete_files', 'view_files'
      ],
      
      client: [
        'view_projects',
        'view_teams',
        'create_tasks', 'update_tasks', 'view_tasks', 'update_task_status', // Can create but not delete tasks
        'create_bugs', 'view_bugs', 'approve_fixes', // Can create bugs and approve fixes
        'upload_files', 'view_files', // Can upload but not delete files
        'view_payments'
      ],
      
      freelancer: [
        'view_projects',
        'view_teams',
        'view_tasks', 'update_task_status',
        'create_bugs', 'update_bugs', 'view_bugs', // Can create and update but not delete bugs
        'upload_files', 'update_files', 'view_files', // Can upload and update but not delete files
      ],
      
      TeamMember: [
        'view_projects',
        'view_teams',
        'view_tasks', 'update_task_status',
        'create_bugs', 'view_bugs',
        'upload_files', 'view_files' // Basic file operations only
      ]
    };

    // Assign permissions to roles
    await Promise.all(
      createdRoles.map(async ([role]) => {
        const rolePerms = rolePermissions[role.name];
        if (rolePerms) {
          const permissions = allPermissions.filter(perm => 
            rolePerms.includes(perm.name)
          );
          await role.setPermissions(permissions);
        }
      })
    );

    res.status(200).send({ 
      message: 'Roles and permissions seeded successfully',
      roles: roles.map(r => r.name),
      permissions: permissions.map(p => ({ name: p.name, description: p.description }))
    });
  } catch (error) {
    console.error('Seeding error:', error);
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;