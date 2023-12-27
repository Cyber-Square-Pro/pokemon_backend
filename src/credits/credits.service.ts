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
      return await this.creditModel.create({ user: user._id });
    } catch (error) {
      throw error;
    }
  }
  async getCredits(user: User) {
    try {
      return await this.creditModel.findOne({ user: user._id }).exec();
    } catch (error) {
      throw error;
    }
  }
  async addCredits(user: User) {
    const reward = Number.parseFloat(process.env.DAILY_REWARD);
    try {
      const creditData = await this.creditModel
        .findOne({ user: user._id })
        .exec();
      const current = creditData.credits as number;
      console.log(current, ' : ', creditData.credits);
      creditData.credits = current + reward ?? 25.0;
     return creditData.save();
    } catch (error) {
      throw error;
    }
  }
  async spendCredits(user: User, amount: number) {
    try {
      const creditData = await this.creditModel.findOne({ user: user._id }).exec();
      const current = creditData.credits as number;
      creditData.credits = current - amount;
      return creditData.save();
    } catch (error) {
      throw error;
    }
  }
}
