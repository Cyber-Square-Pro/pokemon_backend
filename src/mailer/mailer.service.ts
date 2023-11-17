import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
@Injectable()
export class MailerService {
  private gmailUser: string = process.env.GMAIL_USER;
  private gmailPass: string = process.env.GMAIL_PASS;
  private transporter

  constructor(){
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: this.gmailUser,
        pass: this.gmailPass
      },
    })
  }

  async sendVerificationEmail(email:string,otp:number) {

    const mailOptions = {
      from:'pokemon.team.b@gmail.com',
      to:email,
      subject:'Email Verification for Pokemon App',
      text:`Your verification OTP Number is as follows: ${otp} \n`,
    }

  //  return this.transporter.sendMail(mailOptions)
  return true
  }
}
