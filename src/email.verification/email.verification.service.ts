import { Injectable } from '@nestjs/common'
import {MailerService } from '../mailer/mailer.service'
@Injectable()
export class EmailVerificationService {
    constructor(private readonly mailerService: MailerService) {}

    async sendVerificationEmail(email: string, otp: string): Promise<void> {
      // Use the MailerService to send an email with the OTP to the user's email address.
      await this.mailerService.sendMail({
        to: email,
        subject: 'Email Verification from Pokemon App',
        template: 'email-verification', // Create an email template in your app.
        context: {
          otp,
        },
      });
    }
  
    async verifyEmail(otp: string, userInputOtp: string): Promise<boolean> {
      // Compare the OTP provided by the user with the generated OTP.
      return otp === userInputOtp;
    }
}
