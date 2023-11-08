import { Injectable } from '@nestjs/common'
import {MailerService } from '../mailer/mailer.service'
@Injectable()
export class EmailVerificationService {
    constructor(private readonly mailerService: MailerService) {}

    async sendVerificationEmail(email: string, otp: string): Promise<void> {
      await this.mailerService.sendMail({
        to: email,
        subject: 'Email Verification from Pokemon App',
        template: 'email-verification', 
        context: {
          otp,
        },
      });
    }
  
    verifyEmail(otp: string, userInputOtp: string): boolean {
      return otp === userInputOtp;
    }
}
