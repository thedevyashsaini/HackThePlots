'use server'
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    tls: {
        ciphers: "SSLv3",
        rejectUnauthorized: false,
    },

    auth: {

        user: username,
        pass: password
    }
});

const mail = await transporter.sendMail({
    from: username,
    to: myEmail,
    replyTo: email,
    subject: Website activity from ${email},
    html: `
    <p>Name: ${name} </p>
    <p>Email: ${email} </p>
    <p>Message: ${message} </p>
    `,
})
