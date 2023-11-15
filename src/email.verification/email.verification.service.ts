import { Injectable } from '@nestjs/common'
import {MailerService } from '../mailer/mailer.service'
@Injectable()
export class EmailVerificationService {
    constructor(private readonly mailerService: MailerService) {}

    async sendVerificationEmail(email: string, otp: number):Promise<boolean> {
     const res =  await this.mailerService.sendMail({
        to: email,
        subject: 'Email Verification from Pokemon App',
        template: `email-verification \n OTP: ${otp}`, 
        context: {
          otp,
        },
      });
      if(res) return true
      else return false

    }
  
    verifyEmail(otp: number, userEnteredOTP: number): boolean {
      return otp === userEnteredOTP;
    }
}
