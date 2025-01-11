const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Role } = require('../../models'); // Adjust the path based on your project structure
const { Op } = require('sequelize');

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already in use.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        // Fetch the 'client' role
        const clientRole = await Role.findOne({ where: { name: 'admin' } });

        if (!clientRole) {
            return res.status(400).json({ message: 'Client role not found.' });
        }

        // Create the user
        const user = await User.create({
            name,
            email,
            password: hashedPassword,
            status: 'active',
            lastLogin: new Date(),
        });

        // Associate the user with the 'client' role (many-to-many)
        await user.addRole(clientRole); // Sequelize will use the UserRoles join table automatically

        return res.status(201).json({ message: 'User registered successfully.', user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Log in a user
const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find the user by email
        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Check if the password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate a JWT token
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({ message: 'Login successful.', token, user });
    } catch (error) {
        return res.status(500).json({ message: 'Internal server error.', error });
    }
}

// Log out a user
const logout = (req, res) => {
    // Since JWT is stateless, the logout can be handled on the client-side by removing the token
    // Here, we just respond with a success message
    return res.status(200).json({ message: 'Logout successful.' });
}

module.exports = {
    register,
    login,
    logout
}
