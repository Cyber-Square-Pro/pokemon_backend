import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
@Injectable()
export class MailerService {
  //constructor(){
  //   this.transporter = nodemailer.createTransport({
  //     host:'live.smtp.mailtrap.io',
  //     port:2525,
  //     auth: {
  //       user: this.envUser,
  //       pass: this.envPass
  //     },
  //   })
  // }
  //}

  // async sendVerificationEmail(email: string, otp: number) {
  //   const mailOptions = {
  //     from: 'pokemon.team.b@gmail.com',
  //     to: email,
  //     subject: 'Email Verification for Pokemon App',
  //     text: `Your verification OTP Number is as follows: ${otp} \n`,
  //   };

  //   try {
  //     const result = await this.transporter.sendMail(mailOptions);
  //     console.log('Email sent:', result);
  //     return result;
  //   } catch (error) {
  //     console.error('Error sending email:', error);
  //     throw error; // rethrow the error to propagate it further
  //   }
  // }

  async sendResetEmail(email: string, otp: number) {
    return true;
  }
  async sendVerificationEmail(email: string, otp: number) {
    return true;
  }
}
