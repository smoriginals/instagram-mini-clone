import express from 'express';
import connectDB from './db.js';
import dotenv from 'dotenv';
import cors from 'cors';
import usersignupRoute from './Routes/usersignup.route.js';
import userloginRoute from './Routes/userlogin.route.js';
import userprofileupdateRoute from './Routes/userprofileupdate.route.js';
import deleteuserRoute from './Routes/deleteuser.route.js';
import profilepictureRoute from './Routes/profilepicture.route.js';
import adduserpostRoute from './Routes/adduserpost.route.js';

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.SERVER_PORT;
app.use(cors({
    origin: "*", // Allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));

//Bottom 5 endpoints use for user sign up,login,profile updation(Minimal)
app.use('/api/user', usersignupRoute);
app.use('/api/user', userloginRoute);
app.use('/api/user', userprofileupdateRoute);
app.use('/api/user', deleteuserRoute);
app.use('/api/user', profilepictureRoute);
//Above 5 endpoints use for user sign up,login,profile updation(Minimal)


app.use('/api/user/post', adduserpostRoute);

//Homelocation
app.use('/', (req, res) => res.send(`${PORT} API Port is Running...`));

//Listen to the server
app.listen(PORT, () => console.log(`App listening on port ${PORT}`));