import nodemailer from 'nodemailer';

import dotenv from 'dotenv';
dotenv.config();

const sender = nodemailer.createTransport({

    service: 'gmail',
    auth: {
        user: process.env.MAIL_USER,
        pass:process.env.MAIL_PASS,
    }
})
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