import { Body, Controller, Patch, Post } from '@nestjs/common';
import { DailyCheckinService } from './daily.checkin.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { UserService } from 'src/users/users.service';

@Controller('daily-checkin')
export class DailyCheckinController {
  constructor(
    private readonly checkinService: DailyCheckinService,
    private readonly userService: UserService,
  ) {}

  @Post('history')
  async getUserHistory(@Body() body: { username: string }) {
    const user = await this.userService.findUserByName(body.username);
    return await this.checkinService.getCheckinHistory(user);
  }

  @Patch('check-in')
  checkIn(@Body() body: { username: string }) {
    return this.checkinService.checkInUser(body.username);
  }

  @Cron(CronExpression.EVERY_30_SECONDS)
  @Post('auto-checkin')
  async checkInByCron() {
    await this.checkinService.createDailyCheckinByCron();
  }
}
