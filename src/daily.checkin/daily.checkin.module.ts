import { Module } from '@nestjs/common';
import { DailyCheckinService } from './daily.checkin.service';
import { MongooseModule } from '@nestjs/mongoose';
import {  DailyCheckinSchema } from './daily.checkin.model';
import { UserSchema } from 'src/users/user.model';

@Module({
  imports:[
    MongooseModule.forFeature([{ name: 'DailyCheckin', schema: DailyCheckinSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [DailyCheckinService]
})
export class DailyCheckinModule {}
