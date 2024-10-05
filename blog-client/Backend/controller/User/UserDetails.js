const UserModel = require('../../model/User/UserModel');

const UserDetailsController = async (req, res) => {
    try {
        const id = req.user._id;  
        const user = await UserModel.findById(id);
        if (!user) {
            return res.status(404).json({ 
                message: 'User not found', 
                success: false 
            });
        }

        // Return the user details
        return res.status(200).json({ 
            message: 'User details retrieved successfully', 
            success: true,
            user: user
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ 
            message: 'Internal server error', 
            success: false 
        });
    }
};

module.exports = UserDetailsController;
