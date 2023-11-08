import { Injectable } from '@nestjs/common'
import {MailerService } from '../mailer/mailer.service'
import { UserService } from 'src/users/users.services';
@Injectable()
export class EmailVerificationService {
    constructor(private readonly mailerService: MailerService,private readonly usersService : UserService) {}

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
  
    async verifyEmail(otp: string, userInputOtp: string): Promise<boolean> {
      return otp === userInputOtp;
    }
}
