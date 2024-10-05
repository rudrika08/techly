const UserModel = require('./../../model/User/UserModel');
const bcrypt = require('bcryptjs');

const SignUpController = async (req, res) => {
    try {
        const { username, password } = req.body;

        // Check if required fields are present
        if (!username || !password) {
            return res.status(400).json({ message: 'All fields are required', success: false });
        }

        // Check if the username already exists
        const existingUser = await UserModel.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ message: 'Username already exists', success: false });
        }

        // Hash the password
        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        // Create a new user
        const user = await UserModel.create({
            username,
            password: hashedPassword
        });

        // Respond with a success message
        return res.status(201).json({ 
            message: 'User created successfully', 
            success: true,
            user: { id: user._id, username: user.username }
        });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', success: false, error: error.message });
    }
};

module.exports = SignUpController;
