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
      const current = Number.parseFloat(creditData.credits as string);
      console.log(current, ' : ', creditData.credits);
      const total = current + reward ?? 25.0;
      creditData.credits = total.toString();
      return creditData.save();
    } catch (error) {
      throw error;
    }
  }
  async spendCredits(user: User, amount: number) {
    try {
      const creditData = await this.creditModel
        .findOne({ user: user._id })
        .exec();
      const current = Number.parseFloat(creditData.credits.toString());
      const remaining = current - amount;
      creditData.credits = remaining.toString();
      return creditData.save();
    } catch (error) {
      throw error;
    }
  }
}
