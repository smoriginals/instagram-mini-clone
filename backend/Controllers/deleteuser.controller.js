import usersignupModel from '../Models/usersignup.model.js';

export default async function deleteUser(req,res) {
    try {
        const { _id } = req.body;

        if (!_id) return res.status(400).json({ message: "User ID missing" });

        await usersignupModel.findByIdAndDelete(_id);

        res.json({ ok: true, message: "User deleted successfully" });
    }
    catch (error) {
        res.status(400).json({ message: "Network Error", error:error.message })
    }
}