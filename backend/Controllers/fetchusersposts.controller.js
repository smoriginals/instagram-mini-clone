import userpostsModel from '../Models/userposts.model.js';

export default async function fetchUsersPosts(req, res) {
    try {
        const posts = await userpostsModel.find().sort({ createdAt: -1 });
        
    }
    catch (error) {
        console.log("Error Found:", error.message);
    }
}