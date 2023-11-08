import { Module } from '@nestjs/common';
import { UsersController } from './users.controllers';
import { UserService } from './users.services';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './user.model';
import { EmailVerificationService } from 'src/email.verification/email.verification.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    EmailVerificationService,
  ],
  controllers: [UsersController],
  providers: [UserService],
})
export class UsersModule {}
