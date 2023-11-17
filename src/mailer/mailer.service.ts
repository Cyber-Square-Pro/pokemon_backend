import { Injectable } from '@nestjs/common'
import * as nodemailer from 'nodemailer'
@Injectable()
export class MailerService {

  private transporter

  constructor(){
    this.transporter = nodemailer.createTransport({
      // Email provider and mail server config
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
