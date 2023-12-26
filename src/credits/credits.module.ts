import { Module } from '@nestjs/common';
import { CreditsController } from './credits.controller';
import { CreditsService } from './credits.service';
import { CreditsSchema } from './credits.model';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/users/user.model';
import { UserService } from 'src/users/users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Credits', schema: CreditsSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [CreditsController],
  providers: [CreditsService,UserService],
})
export class CreditsModule {}
