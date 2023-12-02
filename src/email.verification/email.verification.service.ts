import { Injectable } from '@nestjs/common';
import { MailerService } from '../mailer/mailer.service';

@Injectable()
export class EmailVerificationService {
  constructor(private readonly mailService: MailerService) {}

  async sendOtpEmail(
    email: string,
    otp: number,
    intent: string,
  ): Promise<boolean> {
    console.log(intent)
    if (intent == 'SIGN_UP') {
      return await this.mailService.sendVerificationEmail(email, otp);
    } else if (intent == 'RESET_PASS') {
      return await this.mailService.sendResetEmail(email, otp);
    }
  }
}
