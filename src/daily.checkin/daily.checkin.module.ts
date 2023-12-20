import { Module } from '@nestjs/common';
import { DailyCheckinService } from './daily.checkin.service';

@Module({
  providers: [DailyCheckinService]
})
export class DailyCheckinModule {}
