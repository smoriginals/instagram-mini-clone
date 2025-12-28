import usersignupModel from '../Models/usersignup.model.js';

export default async function allUsers(req, res) {
    try {

        const users = await usersignupModel.find().select('-password');

        if (!users.length) {
            return res.status(400).json({
                success: false,
                message: 'No User Found!',
            })
        }

        const userData = users.map((data) => {
            return data;
        })

        return res.status(201).json({
            success: true,
            message: 'Users Found',
            totalUsers:users.length,
            users,
        })
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error.message || 'Network Error!',
        })
    }
}