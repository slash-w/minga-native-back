import User from '../../models/User.js';
import { google } from 'googleapis';
import nodemailer from 'nodemailer';

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://localhost:5173"
);

oauth2Client.setCredentials({
    refresh_token: process.env.REFRESH_TOKEN,
});

const accessToken = oauth2Client.getAccessToken();

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        type: "OAuth2",
        user: "mingamangamh@gmail.com",
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        refreshToken: process.env.REFRESH_TOKEN,
        accessToken: accessToken,
    },
});

// Función para generar un código de verificación aleatorio
function generateVerificationCode() {
    const length = 6; // Longitud del código de verificación (puedes ajustarla según tus necesidades)
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let code = '';
    for (let i = 0; i < length; i++) {
        code += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return code;
}

export default async (req, res, next) => {
    try {
        // Generar un código de verificación para el usuario
        const verificationCode = generateVerificationCode();

        // Crear el usuario en la base de datos con el código de verificación
        const newUser = await User.create({ ...req.body, verify_code: verificationCode });

        // Enviar el correo de verificación
        const mailOptions = {
            from: 'mingamangamh@gmail.com',
            to: newUser.email,
            subject: 'Verificación de Usuario',
            text: `Tu código de verificación es: ${verificationCode}`,
        };

        const info = await transporter.sendMail(mailOptions);
        console.log('Correo electrónico enviado:', info.response);

        return res.status(201).json({ response: newUser, success: true, message: 'User created successfully' });
    } catch (error) {
        next(error);
    }
};
