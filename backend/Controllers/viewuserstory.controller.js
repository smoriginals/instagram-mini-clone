import userstoryModel from '../Models/userstory.model.js';
import usersignupModel from '../Models/usersignup.model.js';

export default async function viewUserStory(req, res) {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).json({ success: false, message: 'user Id required' });
        }

        const user = await usersignupModel.findById(id).select('_id username userProfile');
        if (!user) {
            return res.status(404).json({ success: false, message: "user not found" });

        }

        const visibleforday = new Date(Date.now() - 24 * 60 * 60 * 1000);

        const story = await userstoryModel.find({
            userId: id,
            createdAt: { $gte: visibleforday },
        }).sort({ createdAt: 1 })

        return res.status(200).json({ success: true, user, story })
    }
    catch (error) {
        res.status(500).json({ success: false, message: 'server error' })
    }
}