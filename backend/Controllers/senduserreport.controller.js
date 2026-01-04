import usersignupModel from '../Models/usersignup.model.js';
import sender from '../Jobs/mailer.js';


export default async function sendUserReport(req, res) {

    
    const { name, email, message } = req.body;

    if (!email || !message || !name) {
        return res.status(400).json({
            success: false,
            message: 'All Fields Required'
        })
    }

    try {
        await sender.sendMail({
            from: `"River Support" <${email}>`,
            to: process.env.MAIL_USER,
            replyTo: email,
            subject: `Support Message From ${name || "user"}`,
            html: `<h3>New Support Message</h3>
                <p><b>Name:</b> ${name || "N/A"}</p>
                <p><b>Email:</b> ${email}</p>
                <p><b>Message:</b></p>
                <p>${message}</p>`,
        })

        return res.status(200).json({
            success: true,
            message: 'message sent successfully'
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message || 'Internal Server Error',
        })
    }
}