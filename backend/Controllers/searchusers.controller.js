import usersignupModel from '../Models/usersignup.model.js';

export default async function searchUsers(req, res) {
    try {
        const { name } = req.query;

        if (!name || name.trim()==='') {
            return res.status(400).json({
                success: false,
                message: 'Name query parameter is required'
            })
        }

        const searchUser = await usersignupModel.find({
            name: { $regex: name, $options: 'i' }
        }).select('-password');

        if (searchUser.length===0) {
            return res.status(200).json({
                success: true,
                message: 'No Users found with this name',
                searchUser:[]
            })
        }

        return res.status(200).json({
            success: true,
            message: 'Users Found',
            searchUser
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: 'Internal Server Error!',
            error: error.message
        })
    }
}