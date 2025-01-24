const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // Use `true` for port 465, `false` for all other ports
    auth: {
        user: "vasudevds1729@gmail.com",
        pass: "vbob iipd fagx uqzi",
    },
});

// Tailwind CSS classes won't work in emails because:
// 1. Email clients strip out <link> tags for security reasons
// 2. Many email clients don't support external stylesheets
// 3. Email HTML needs to use inline styles for compatibility
// That's why we use inline CSS styles instead

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
            background: linear-gradient(to right, #166534, #1d4ed8);
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
            <a href="${user.verificationLink}" class="button" style="background: linear-gradient(to right, #166534, #1d4ed8); color: #ffffff; font-family: serif;">Verify Email Address</a>
        </div>
        <p class="text" style="font-style: italic; font-size: 14px;">If the button appears inactive, kindly utilize this link:</p>
        <p style="color: #1d4ed8; word-break: break-all; margin-bottom: 24px; font-size: 14px;">${user.verificationLink}</p>
        <div class="footer">
            <p>Should you not have initiated this account creation, please disregard this correspondence.</p>
        </div>
    </div>
</body>
</html>`;

const sendEmail = async (to, subject, html) => {
    console.log(to,subject,html)
    try {
        const info = await transporter.sendMail({
            from: '"Vasudev DS" <vasudevds1729@gmail.com>',
            to,
            subject,
            html
        })
        return info
    } catch (error) {
        console.log(error)

    }
}

module.exports = {
    sendEmail,
    registrationSuccess
}