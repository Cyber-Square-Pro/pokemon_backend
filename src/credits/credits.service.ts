import { Injectable } from '@nestjs/common';
import { Credits } from './credits.model';
import { Model } from 'mongoose';
import { User } from 'src/users/user.model';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class CreditsService {
  constructor(
    @InjectModel('Credits') private readonly creditModel: Model<Credits>,
  ) {}

  async createAccount(user: User) {
    try {
      await this.creditModel.create({ user: user });
    } catch (error) {
      throw error;
    }
  }
  async getCredits(user: User) {
    try {
      await this.creditModel.findOne({ user: user }).exec();
    } catch (error) {
      throw error;
    }
  }
  async addCredits(user: User) {
    const reward = Number.parseFloat(process.env.DAILY_REWARD);
    try {
      const creditData = await this.creditModel.findOne({ user: user });
      const current = creditData.credits as number;
      creditData.credits = current + reward;
      creditData.save();
    } catch (error) {
      throw error;
    }
  }
}
