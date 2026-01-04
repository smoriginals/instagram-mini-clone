import usersignupModel from "../Models/usersignup.model.js";

export default async function updateUserProfile(req, res) {

    try {
        const { _id } = req.body; //you can add email,password if needed.
        if (!_id) {
            return res.status(400).json({ message: "ID is missing: ", _id });
        }
        const updateUser = await usersignupModel.findByIdAndUpdate(_id, { $set: req.body }, { new: true });
        if (!updateUser) {
            res.status(400).json({ message: "User not found:", updateUser });
        }
        res.json({ ok: true, updatedUser: updateUser });
    }
    catch (error) {
        res.status(500).json({ message: "server error", error: error.message });
    }
}
