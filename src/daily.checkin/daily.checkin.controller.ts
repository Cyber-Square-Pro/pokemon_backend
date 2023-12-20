import { Body, Controller, Patch, Post } from '@nestjs/common';

@Controller('daily-checkin')
export class DailyCheckinController {
  @Post('progress')
  getUserProgress(@Body() body: { username: string }) {
    //
  }

  @Patch('check-in')
  checkIn() {
    //
  }
}
