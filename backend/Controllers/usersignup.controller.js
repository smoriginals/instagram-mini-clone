import usersignupModel from "../Models/usersignup.model.js";

export default async function createUser(req, res) {
    try {
        const { email, name, username, password } = req.body;

        if (!email || !password || !name || !username) {
            return res.status(400).json({
                success: false,
                message: "Almost there! Complete all fields to finish signing up.",
            });
        }


        const existingUser = await usersignupModel.findOne({ $or: [{ email }, { username }] });

        if (existingUser) {
            return res.status(400).json({ success: false, message: "Email or Username already exists" });
        }
        const newUser = new usersignupModel({
            email,
            name,
            username,
            password
        });

        await newUser.save();
        //res.json({ success: true, newUser });
        res.status(201).json({ success: true, newUser });
    } catch (error) {
        console.error("Failed to Create User", error);
        // 3️⃣ HANDLE DUPLICATE ERROR FROM MONGOOSE (just in case)
        if (error.code === 11000) {
            return res.status(400).json({
                success: false,
                message: "Duplicate field: user already exists"
            });
        }

        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}