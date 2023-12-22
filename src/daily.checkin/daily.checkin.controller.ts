import { Body, Controller, Patch, Post } from '@nestjs/common';
import { DailyCheckinService } from './daily.checkin.service';

@Controller('daily-checkin')
export class DailyCheckinController {
  constructor(private readonly checkinService: DailyCheckinService) {}

  @Post('history')
  getUserHistory(@Body() body: { username: string }) {
    return this.checkinService.getCheckinHistory(body.username);
  }

  // @Post('is-checked-today')
  // isCheckedToday(@Body() body: { username: string }) {
  //   //
  // }
  @Patch('check-in')
  checkIn(@Body() body: { username: string }) {
    return this.checkinService.checkInUser(body.username);
  }
}
