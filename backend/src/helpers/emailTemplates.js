const registrationSuccess = (user) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Welcome to Our Community!</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #fff0f3;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: linear-gradient(to bottom right, #f0fdf4, #eff6ff);
            border: 4px double rgba(21, 128, 61, 0.2);
        }
        .logo {
            height: 64px;
            margin-bottom: 24px;
            opacity: 0.9;
        }
        .title {
            font-family: serif;
            font-size: 30px;
            color: #166534;
            margin-bottom: 24px;
            text-align: center;
            border-bottom: 2px solid rgba(21, 128, 61, 0.2);
            padding-bottom: 16px;
        }
        .text {
            color: #166534;
            margin-bottom: 16px;
            line-height: 1.5;
        }
        .button {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(to right, #15803d, #3b82f6);
            color: #ffffff;
            font-family: serif;
            text-decoration: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
            transition: all 0.2s;
        }
        .button:hover {
            box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
            transform: translateY(-2px);
        }
        .footer {
            border-top: 2px solid rgba(21, 128, 61, 0.2);
            padding-top: 24px;
            font-size: 14px;
            color: #166534;
            text-align: center;
            font-style: italic;
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="/api/placeholder/150/50" alt="Company Logo" class="logo"/>
        <h1 class="title">Welcome to Projexpert!</h1>
        <p class="text">Dear ${user.name},</p>
        <p class="text">We are delighted to welcome you to Projexpert, where innovation meets tradition.</p>
        <p class="text">Your account has been crafted with care. Please verify your email address to begin your journey:</p>
        <div style="text-align: center; margin: 32px 0;">
            <a href="${user.verificationLink}" class="button">Verify Email Address</a>
        </div>
        <p class="text" style="font-style: italic; font-size: 14px;">If the button appears inactive, kindly utilize this link:</p>
        <p style="color: #1d4ed8; word-break: break-all; margin-bottom: 24px; font-size: 14px;">${user.verificationLink}</p>
        <div class="footer">
            <p>Should you not have initiated this account creation, please disregard this correspondence.</p>
        </div>
    </div>
</body>
</html>`;

const projectCreation = (project) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>New Project Announcement</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: linear-gradient(to bottom right, #f0fdf4, #eff6ff);
            border: 4px double rgba(21, 128, 61, 0.2);
        }
        .logo {
            height: 64px;
            margin-bottom: 24px;
            opacity: 0.9;
        }
        .title {
            font-family: serif;
            font-size: 30px;
            color: #166534;
            margin-bottom: 24px;
            text-align: center;
            border-bottom: 2px solid rgba(21, 128, 61, 0.2);
            padding-bottom: 16px;
        }
        .text {
            color: #166534;
            margin-bottom: 16px;
            line-height: 1.5;
            font-family: serif;
        }
        .project-details {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 24px;
            border-radius: 8px;
            border: 2px solid rgba(21, 128, 61, 0.2);
            margin-bottom: 24px;
        }
        .details-title {
            font-family: serif;
            color: #166534;
            font-size: 20px;
            margin-bottom: 16px;
            text-align: center;
        }
        .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #166534;
        }
        .details-list li {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }
        .details-list li:before {
            content: "✦";
            position: absolute;
            left: 0;
            font-family: serif;
        }
        .button {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(to right, #15803d, #3b82f6);
            color: white;
            font-family: serif;
            text-decoration: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="/api/placeholder/150/50" alt="Company Logo" class="logo"/>
        <h1 class="title">New Project Announcement</h1>
        <p class="text">Dear ${project.userName},</p>
        <p class="text">We are pleased to announce the creation of a new venture:</p>
        <div class="project-details">
            <p class="details-title">Project Particulars</p>
            <ul class="details-list">
                <li>Project Name: ${project.projectName}</li>
                <li>Commencement: ${project.startDate}</li>
                <li>Completion: ${project.dueDate}</li>
                <li>Description: ${project.projectDescription}</li>
            </ul>
        </div>
        <div style="text-align: center;">
            <a href="#" class="button">View Project Details</a>
        </div>
    </div>
</body>
</html>`;

const teamAllocation = (team) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Team Assignment Notice</title>
    <style>
        body, p, h1, ul, li {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #065f46;
            background-color: #f0fdf4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: linear-gradient(to bottom right, #f0fdf4, #eff6ff);
            border: 4px double rgba(21, 128, 61, 0.2);
        }

        .logo {
            height: 64px;
            margin-bottom: 24px;
            opacity: 0.9;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .title {
            font-family: serif;
            font-size: 30px;
            color: #166534;
            margin-bottom: 24px;
            text-align: center;
            border-bottom: 2px solid rgba(21, 128, 61, 0.2);
            padding-bottom: 16px;
        }

        .text {
            color: #166534;
            margin-bottom: 16px;
            line-height: 1.5;
            font-family: serif;
        }

        .team-details {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 24px;
            border-radius: 8px;
            border: 2px solid rgba(21, 128, 61, 0.2);
            margin-bottom: 24px;
        }

        .details-title {
            font-family: serif;
            color: #166534;
            font-size: 20px;
            margin-bottom: 16px;
            text-align: center;
        }

        .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #166534;
        }

        .details-list li {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }

        .details-list li:before {
            content: "✦";
            position: absolute;
            left: 0;
            font-family: serif;
        }

        .button {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(to right, #15803d, #3b82f6);
            color: white;
            font-family: serif;
            text-decoration: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        @media only screen and (max-width: 600px) {
            .container {
                padding: 16px;
            }

            .title {
                font-size: 24px;
            }

            .button {
                padding: 12px 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="/api/placeholder/150/50" alt="Company Logo" class="logo">
        <h1 class="title">Team Assignment Notice</h1>
        <p class="text">Dear ${team.userName},</p>
        <p class="text">We are delighted to inform you of your team assignment:</p>
        <div class="team-details">
            <p class="details-title">Team Particulars</p>
            <ul class="details-list">
                <li>Team Name: ${team.teamName}</li>
                <li>Team Lead: ${team.teamLead}</li>
                <li>Department: ${team.department}</li>
            </ul>
        </div>
        <div style="text-align: center;">
            <a href="${team.dashboardLink}" class="button">Access Team Dashboard</a>
        </div>
    </div>
</body>
</html>
`;

const projectAllocation = (project) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Project Assignment Notice</title>
    <style>
        body, p, h1, ul, li {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #065f46;
            background-color: #f0fdf4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: linear-gradient(to bottom right, #f0fdf4, #eff6ff);
            border: 4px double rgba(21, 128, 61, 0.2);
        }

        .logo {
            height: 64px;
            margin-bottom: 24px;
            opacity: 0.9;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .title {
            font-family: serif;
            font-size: 30px;
            color: #166534;
            margin-bottom: 24px;
            text-align: center;
            border-bottom: 2px solid rgba(21, 128, 61, 0.2);
            padding-bottom: 16px;
        }

        .text {
            color: #166534;
            margin-bottom: 16px;
            line-height: 1.5;
            font-family: serif;
        }

        .project-details {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 24px;
            border-radius: 8px;
            border: 2px solid rgba(21, 128, 61, 0.2);
            margin-bottom: 24px;
        }

        .details-title {
            font-family: serif;
            color: #166534;
            font-size: 20px;
            margin-bottom: 16px;
            text-align: center;
        }

        .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #166534;
        }

        .details-list li {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }

        .details-list li:before {
            content: "✦";
            position: absolute;
            left: 0;
            font-family: serif;
        }

        .button {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(to right, #15803d, #3b82f6);
            color: white;
            font-family: serif;
            text-decoration: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        @media only screen and (max-width: 600px) {
            .container {
                padding: 16px;
            }

            .title {
                font-size: 24px;
            }

            .button {
                padding: 12px 24px;
            }
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="/api/placeholder/150/50" alt="Company Logo" class="logo">
        <h1 class="title">Project Assignment Notice</h1>
        <p class="text">Dear ${project.userName},</p>
        <p class="text">We are pleased to inform you of your new project assignment:</p>
        <div class="project-details">
            <p class="details-title">Project Particulars</p>
            <ul class="details-list">
                <li>Project: ${project.projectName}</li>
                <li>Your Role: ${project.role}</li>
                <li>Commencement: ${project.startDate}</li>
                <li>Project Manager: ${project.projectManager}</li>
            </ul>
        </div>
        <div style="text-align: center;">
            <a href="${project.projectLink}" class="button">View Project Details</a>
        </div>
    </div>
</body>
</html>
`;

const taskAssignment = (task) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Task Assignment</title>
    <style>
        body, p, h1, ul, li {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #065f46;
            background-color: #f0fdf4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: linear-gradient(to bottom right, #f0fdf4, #eff6ff);
            border: 4px double rgba(21, 128, 61, 0.2);
        }

        .logo {
            height: 64px;
            margin-bottom: 24px;
            opacity: 0.9;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .title {
            font-family: serif;
            font-size: 30px;
            color: #166534;
            margin-bottom: 24px;
            text-align: center;
            border-bottom: 2px solid rgba(21, 128, 61, 0.2);
            padding-bottom: 16px;
        }

        .text {
            color: #166534;
            margin-bottom: 16px;
            line-height: 1.5;
            font-family: serif;
        }

        .task-details {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 24px;
            border-radius: 8px;
            border: 2px solid rgba(21, 128, 61, 0.2);
            margin-bottom: 24px;
        }

        .details-title {
            font-family: serif;
            color: #166534;
            font-size: 20px;
            margin-bottom: 16px;
            text-align: center;
        }

        .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #166534;
        }

        .details-list li {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }

        .details-list li:before {
            content: "✦";
            position: absolute;
            left: 0;
            font-family: serif;
        }

        .button {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(to right, #15803d, #3b82f6);
            color: white;
            font-family: serif;
            text-decoration: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="/api/placeholder/150/50" alt="Company Logo" class="logo">
        <h1 class="title">New Task Assignment</h1>
        <p class="text">Dear ${task.userName},</p>
        <p class="text">A new task awaits your attention:</p>
        <div class="task-details">
            <p class="details-title">Task Particulars</p>
            <ul class="details-list">
                <li>Task: ${task.taskName}</li>
                <li>Project: ${task.projectName}</li>
                <li>Due Date: ${task.dueDate}</li>
                <li>Priority: ${task.priority}</li>
                <li>Description: ${task.taskDescription}</li>
            </ul>
        </div>
        <div style="text-align: center;">
            <a href="${task.taskLink}" class="button">View Task Details</a>
        </div>
    </div>
</body>
</html>
`;

const forgotPassword = (user) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Reset Request</title>
     <style>
        body, p, h1, ul, li {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #065f46;
            background-color: #f0fdf4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: linear-gradient(to bottom right, #f0fdf4, #eff6ff);
            border: 4px double rgba(21, 128, 61, 0.2);
        }

        .logo {
            height: 64px;
            margin-bottom: 24px;
            opacity: 0.9;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .title {
            font-family: serif;
            font-size: 30px;
            color: #166534;
            margin-bottom: 24px;
            text-align: center;
            border-bottom: 2px solid rgba(21, 128, 61, 0.2);
            padding-bottom: 16px;
        }

        .text {
            color: #166534;
            margin-bottom: 16px;
            line-height: 1.5;
            font-family: serif;
        }

        .task-details {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 24px;
            border-radius: 8px;
            border: 2px solid rgba(21, 128, 61, 0.2);
            margin-bottom: 24px;
        }

        .details-title {
            font-family: serif;
            color: #166534;
            font-size: 20px;
            margin-bottom: 16px;
            text-align: center;
        }

        .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #166534;
        }

        .details-list li {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }

        .details-list li:before {
            content: "✦";
            position: absolute;
            left: 0;
            font-family: serif;
        }

        .button {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(to right, #15803d, #3b82f6);
            color: white;
            font-family: serif;
            text-decoration: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="/api/placeholder/150/50" alt="Company Logo" class="logo">
        <h1 class="title">Password Reset Request</h1>
        <p class="text">Dear ${user.userName},</p>
        <p class="text">We have received your request to reset your password. Please click below to proceed:</p>
        <div style="text-align: center; margin: 32px 0;">
            <a href="${user.resetLink}" class="button">Reset Password</a>
        </div>
        <p class="text" style="font-style: italic; font-size: 14px;">If the button appears inactive, kindly utilize this link:</p>
        <p style="color: #1d4ed8; word-break: break-all; margin-bottom: 24px; font-size: 14px;">${user.resetLink}</p>
        <p class="text" style="font-style: italic;">This link shall expire in 24 hours. If you did not request this change, please disregard this notice.</p>
    </div>
</body>
</html>
`;

const resetPasswordConfirmation = (user) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Password Successfully Reset</title>
     <style>
        body, p, h1, ul, li {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #065f46;
            background-color: #f0fdf4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: linear-gradient(to bottom right, #f0fdf4, #eff6ff);
            border: 4px double rgba(21, 128, 61, 0.2);
        }

        .logo {
            height: 64px;
            margin-bottom: 24px;
            opacity: 0.9;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .title {
            font-family: serif;
            font-size: 30px;
            color: #166534;
            margin-bottom: 24px;
            text-align: center;
            border-bottom: 2px solid rgba(21, 128, 61, 0.2);
            padding-bottom: 16px;
        }

        .text {
            color: #166534;
            margin-bottom: 16px;
            line-height: 1.5;
            font-family: serif;
        }

        .task-details {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 24px;
            border-radius: 8px;
            border: 2px solid rgba(21, 128, 61, 0.2);
            margin-bottom: 24px;
        }

        .details-title {
            font-family: serif;
            color: #166534;
            font-size: 20px;
            margin-bottom: 16px;
            text-align: center;
        }

        .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #166534;
        }

        .details-list li {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }

        .details-list li:before {
            content: "✦";
            position: absolute;
            left: 0;
            font-family: serif;
        }

        .button {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(to right, #15803d, #3b82f6);
            color: white;
            font-family: serif;
            text-decoration: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="/api/placeholder/150/50" alt="Company Logo" class="logo">
        <h1 class="title">Password Successfully Reset</h1>
        <p class="text">Dear ${user.userName},</p>
        <p class="text">Your password has been successfully reset. You may now access your account with your new credentials.</p>
        <div style="text-align: center; margin: 32px 0;">
            <a href="${user.loginLink}" class="button">Access Your Account</a>
        </div>
        <p class="text" style="font-style: italic; text-align: center;">If you did not initiate this change, please contact our support team with utmost urgency.</p>
    </div>
</body>
</html>
`;

const taskDueReminder = (task) => `
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Courteous Task Reminder</title>
    <style>
        body, p, h1, ul, li {
            margin: 0;
            padding: 0;
        }

        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #065f46;
            background-color: #f0fdf4;
        }

        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 32px;
            background: linear-gradient(to bottom right, #f0fdf4, #eff6ff);
            border: 4px double rgba(21, 128, 61, 0.2);
        }

        .logo {
            height: 64px;
            margin-bottom: 24px;
            opacity: 0.9;
            display: block;
            margin-left: auto;
            margin-right: auto;
        }

        .title {
            font-family: serif;
            font-size: 30px;
            color: #166534;
            margin-bottom: 24px;
            text-align: center;
            border-bottom: 2px solid rgba(21, 128, 61, 0.2);
            padding-bottom: 16px;
        }

        .text {
            color: #166534;
            margin-bottom: 16px;
            line-height: 1.5;
            font-family: serif;
        }

        .task-details {
            background-color: rgba(255, 255, 255, 0.5);
            padding: 24px;
            border-radius: 8px;
            border: 2px solid rgba(21, 128, 61, 0.2);
            margin-bottom: 24px;
        }

        .details-title {
            font-family: serif;
            color: #166534;
            font-size: 20px;
            margin-bottom: 16px;
            text-align: center;
        }

        .details-list {
            list-style: none;
            padding: 0;
            margin: 0;
            color: #166534;
        }

        .details-list li {
            margin-bottom: 12px;
            padding-left: 20px;
            position: relative;
        }

        .details-list li:before {
            content: "✦";
            position: absolute;
            left: 0;
            font-family: serif;
        }

        .button {
            display: inline-block;
            padding: 12px 32px;
            background: linear-gradient(to right, #15803d, #3b82f6);
            color: white;
            font-family: serif;
            text-decoration: none;
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <div class="container">
        <img src="/api/placeholder/150/50" alt="Company Logo" class="logo">
        <h1 class="title">Courteous Task Reminder</h1>
        <p class="text">Dear ${task.userName},</p>
        <p class="text">This notice serves to remind you of an approaching deadline ${task.dueTimeframe}:</p>
        <div class="task-details">
            <p class="details-title">Task Particulars</p>
            <ul class="details-list">
                <li>Task: ${task.taskName}</li>
                <li>Project: ${task.projectName}</li>
                <li>Due Date: ${task.dueDate}</li>
                <li>Current Status: ${task.currentStatus}</li>
            </ul>
        </div>
        <div style="text-align: center;">
            <a href="${task.taskLink}" class="button">View Task Details</a>
        </div>
    </div>
</body>
</html>
`;

module.exports = {
    registrationSuccess,
    projectCreation,
    teamAllocation,
    projectAllocation,
    taskAssignment,
    forgotPassword,
    resetPasswordConfirmation,
    taskDueReminder
};