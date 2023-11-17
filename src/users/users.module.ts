import { Module } from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UserService } from './users.services';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { EmailVerificationModule } from 'src/email.verification/email.verification.module';
import { MailerModule } from '../mailer/mailer.module';
import { EmailVerificationService } from '../email.verification/email.verification.service';
import { MailerService } from '../mailer/mailer.service';
import { OtpService } from '../otp/otp.service';
import { OtpSchema } from '../otp/otp.model';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'Otp', schema: OtpSchema }]),
    EmailVerificationModule,
    MailerModule
  ],
  controllers: [UsersController],
  providers: [UserService,EmailVerificationService,MailerService,OtpService],
})
export class UsersModule {}
