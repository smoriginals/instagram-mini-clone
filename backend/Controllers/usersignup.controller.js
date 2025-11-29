import usersignupModel from "../Models/usersignup.model.js";

export default async function createUser(req, res) {
    try {
        const { email, name, username, password } = req.body;

        const newUser = new usersignupModel({
            email,
            name,
            username,
            password
        });
        await newUser.save();
        res.json({ success: true, newUser });
    } catch (error) {
        console.error("Failed to Create User", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}