import { Module } from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UserService } from './users.services';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { EmailVerificationModule } from 'src/email.verification/email.verification.module';
import { MailerModule } from 'src/mailer/mailer.module';
import { EmailVerificationService } from 'src/email.verification/email.verification.service';
import { MailerService } from 'src/mailer/mailer.service';
import { OtpService } from 'src/otp/otp.service';
import { OtpSchema } from 'src/otp/otp.model';

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
