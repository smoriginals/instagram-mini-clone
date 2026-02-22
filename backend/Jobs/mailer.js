import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

console.log("MAIL_USER:", process.env.MAIL_USER);
console.log("MAIL_PASS exists:", !!process.env.MAIL_PASS);

//const sender = nodemailer.createTransport({

//    service: 'gmail',
//    auth: {
//        user: process.env.MAIL_USER,
//        pass:process.env.MAIL_PASS,
//    }
//})

const sender = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, // MUST be false for 587
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
    },
});

if (process.env.NODE_ENV !== 'test') {
    sender.verify((error) => {
        if (error) {
            console.error('[MAILER] SMTP NOT READY:', error.message);
        } else {
            console.log('[MAILER] SMTP SERVER READY');
        }
    });
}
export default sender;