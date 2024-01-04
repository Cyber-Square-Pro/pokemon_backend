import { Injectable, InternalServerErrorException } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailerService {
    private transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com',
        port: 587,
        auth: {
            user: process.env.BREVO_USER,
            pass: process.env.BREVO_PASSWORD,
        },
        authMethod:'PLAIN'
    });

    constructor() {}

    async sendVerificationEmail(email: string, otp: number) {
        const mailOptions = {
            from: 'pokedex-team-b@cybersquare.com',
            to: email,
            subject: 'Email Verification for Pokedex App',
            text: `Your verification OTP Number is as follows: ${otp} \n`,
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Email sent:', result);
            return result;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new InternalServerErrorException('Failed to send email'); // rethrow the error to propagate it further
        }
    }

    async sendResetEmail(email: string, otp: number) {
        const mailOptions = {
            from: 'Pokedex Team B',
            to: email,
            subject: 'Reset password for Pokedex App',
            text: `Your OTP Number for resetting your password is as follows: ${otp} \n`,
        };

        try {
            const result = await this.transporter.sendMail(mailOptions);
            console.log('Email sent', result);
            return result;
        } catch (error) {
            console.error('Error sending email:', error);
            throw new InternalServerErrorException('Failed to send email');
        }
    }

    // async sendResetEmail(email: string, otp: number) {
    //     return true;
    // }
    // async sendVerificationEmail(email: string, otp: number) {
    //     return true;
    // }
}
