import { Injectable, Logger, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.model';
import { DailyCheckin } from './daily.checkin.model';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class DailyCheckinService {
  private readonly logger = new Logger(DailyCheckinService.name);
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    @InjectModel('DailyCheckin')
    private readonly checkinModel: Model<DailyCheckin>,
  ) {}

  // User checkins in manually for that day
  async checkInUser(username: string) {
    // Might have to check if it is too late or not
    const user = await this.userModel.findOne({ name: username }).exec();
    try {
      await this.checkinModel.create({
        user: user._id,
        isCheckedIn: true,
        isCreatedByCron: false,
      });
    } catch (error) {
      throw error;
    }
  }

  // Get checkin history of user
  async getCheckinHistory(username: string) {
    const user = await this.userModel.findOne({ name: username }).exec();

    try {
      return await this.checkinModel.find({ user: user._id });
    } catch (error) {
      throw error;
    }
  }

  // DAILY CHECKIN RECORD FILLER CRON JOB

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async createDailyCheckin() {
    const users = await this.userModel.find();

    for (const user of users) {
      const existingCheckin = await this.checkinModel.findOne({
        user: user._id,
      });
      if (!existingCheckin) {
        await this.checkinModel.create({
          user: user._id,
          isCheckedIn: false,
          isCreatedByCron: true,
        });
        this.logger.debug(`Created daily check-in for user ${user.name}`);
      }
    }
  }
}
