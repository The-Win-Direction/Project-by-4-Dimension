require('dotenv').config();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});


const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from: `"Projecthackfornepal" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        text,
    };

    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
};


//Test
// try {
//     sendEmail(
//         'giridipak743@gmail.com ',
//         'Welcome to Projecthackfornepal! ',
//         'Hey there! We’re excited to have you on Projecthackfornepal. Let us know how you feel today!'
//     );
// } catch (err) {
//     console.error('Email failed:', err);
// }

module.exports = sendEmail;

