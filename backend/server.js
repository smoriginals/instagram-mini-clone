import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import cron from 'node-cron';
import cleanupExpireStory from './Jobs/storycleanup.job.js';

import usersignupRoute from './Routes/usersignup.route.js';
import userloginRoute from './Routes/userlogin.route.js';
import userprofileupdateRoute from './Routes/userprofileupdate.route.js';
import deleteuserRoute from './Routes/deleteuser.route.js';
import profilepictureRoute from './Routes/profilepicture.route.js';


import adduserpostRoute from './Routes/adduserpost.route.js';
import getuserpostsRoute from './Routes/getuserposts.route.js';
import userpostslikeRoute from './Routes/userpostslike.route.js';
import usercommentRoute from './Routes/usercomment.route.js';
import deleteuserpostRoute from './Routes/deleteuserpost.route.js';

import uploaduserstoryRoute from './Routes/uploaduserstory.route.js';
import showuserstoryRoute from './Routes/showuserstory.route.js';
import deleteuserstoryRoute from './Routes/deleteuserstory.route.js';

import fetchallusersRoute from './Routes/fetchallusers.route.js';

import userfollowRoute from './Routes/userfollow.route.js';
import searchusersRoute from './Routes/searchusers.route.js';

import sendreportRoute from './Routes/sendreport.route.js';


dotenv.config();
await connectDB();


//cleanupExpireStory();

//cron.schedule("*/5 * * * *", async () => {
//    await cleanupExpireStory();
//});
if (process.env.NODE_ENV === "production") {
    console.log("CRON Initiating_P...");

    cleanupExpireStory();

    cron.schedule("*/5 * * * *", async () => {
        await cleanupExpireStory();
    });
}

const app = express();
app.use(express.json());


const PORT = process.env.PORT || 5000;

//app.use(cors({
//    origin: ["http://localhost:5173"],
//    methods: ["GET", "POST", "PUT", "DELETE"],
//    credentials: true
//}));
app.use(cors())

//Bottom 5 endpoints use for user sign up,login,profile updation(Minimal)
app.use('/api/user', usersignupRoute);
app.use('/api/user', userloginRoute);
app.use('/api/user', userprofileupdateRoute);
app.use('/api/user', deleteuserRoute);
app.use('/api/user', profilepictureRoute);
//Above 5 endpoints use for user sign up,login,profile updation(Minimal)

//Bottom 5 endpoints use for user post,deletepost,like,unlike,comment(Minimal)
app.use('/api/user/post', adduserpostRoute);
app.use('/api/user/post', usercommentRoute);
app.use('/api/user/post', getuserpostsRoute);
app.use('/api/user/post', userpostslikeRoute);
app.use('/api/user/post', deleteuserpostRoute);
//Above 5 endpoints use for user post,deletepost,like,unlike,comment(Minimal)

//Bottom 3 endpoints use for user add story,deletestory,view(Minimal)
app.use('/api/user/story', uploaduserstoryRoute);
app.use('/api/user/story', showuserstoryRoute);
app.use('/api/user/story', deleteuserstoryRoute);
//Above 3 endpoints use for user add story,deletestory,view(Minimal)


//Follow/Unfollow Users
app.use('/api/user/follow', userfollowRoute);
// Search user to our Entire app
app.use('/api/users', searchusersRoute);
//send Report
app.use('/api/send', sendreportRoute);

//Fetch all users that sign in my app
app.use('/api/smos', fetchallusersRoute);

//Homelocation
app.use('/', (req, res) => res.send(`${PORT} API Port is Running...`));

//Listen to the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));