import { Injectable, Logger, Post } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/user.model';
import { DailyCheckin } from './daily.checkin.model';

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
  async getCheckinHistory(user: User) {
    try {
      return await this.checkinModel.find({ user: user._id });
    } catch (error) {
      throw error;
    }
  }

  // DAILY CHECKIN RECORD FILLER CRON JOB
  async createDailyCheckinByCron() {
    const allUsers = await this.userModel.find();

    // Set the start and end of the current day
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);

    for (const user of allUsers) {
      const existingCheckin = await this.checkinModel.findOne({
        user: user._id,
        createdAt: {
          $gte: startOfDay,
          $lt: endOfDay,
        },
      });
      if (!existingCheckin) {
        await this.checkinModel.create({
          user: user._id,
          isCheckedIn: false,
          isCreatedByCron: true,
        });
        this.logger.debug(`Created daily check-in for user ${user.name}`);
      }else{
        console.log(`Record for today exists for ${user.name}`)
      }
    }
  }
}
