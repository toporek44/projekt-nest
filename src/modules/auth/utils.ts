import { v4 as uuidv4 } from 'uuid';
import * as nodemailer from 'nodemailer';

export function generateToken(): string {
  return uuidv4(); // Generate a UUID as the token
}

export async function sendPasswordResetEmail(email: string, token: string) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: 'maciektestnest@gmail.com',
    to: email,
    subject: 'Password Reset',
    text: `Click the following link to reset your password: http://localhost:3000/reset-password/${token}`,
  });
}
