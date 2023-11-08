import { Module } from '@nestjs/common';
import { EmailVerificationService } from './email.verification.service';
import { MailerService } from 'src/mailer/mailer.service';

@Module({
  providers: [EmailVerificationService, MailerService]
})
export class EmailVerificationModule {}
