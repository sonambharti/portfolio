// server.js
const express = require('express');
const path = require('path');
const cors = require('cors');
require('dotenv').config();
const nodemailer = require('nodemailer');

const app = express();
app.use(express.json()); // Middleware to parse JSON requests

// app.use(cors({ origin: "http://localhost:3000" }));
app.use(cors());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    next();
});

const port = 5000;

// Load environment variables
const senderEmail = process.env.NODEMAILER_EMAIL;
const senderPassword = process.env.NODEMAILER_PASS;
const recipientEmail = process.env.NODEMAILER_TOEMAIL;
// console.log(senderEmail);
// console.log(senderPassword);
// console.log(recipientEmail);

app.post('/send-email', async (req, res) => {
    try {
        console.log("Received request body:", req.body);
        const { email, subject, message } = req.body;

        if (!email || !subject || !message) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            service: 'Gmail',
            auth: {
                user: senderEmail,
                pass: senderPassword
            }
        });

        const mailOptions = {
            from: senderEmail,
            to: recipientEmail,
            replyTo: email,
            subject: subject,
            text: `Sender's Email: ${email}\n\nMessage:\n${message}`
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent:', info.response);
        res.status(200).json({ message: 'Email successfully sent' });

    } catch (error) {
        console.error("Error sending email:", error);
        res.status(500).json({ error: 'Error sending email', details: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
