import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from './otp.model';

@Injectable()
export class OtpService {
  constructor(@InjectModel('Otp') readonly otpModel: Model<Otp>) {}

  generateOTP(): number {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
  }

  async storeOTP(email: string, otp: number): Promise<boolean> {
    const storedOTP = new this.otpModel({
      email,
      otp,
    });
    const result = await storedOTP.save();
    if (result) return true;
    else throw new InternalServerErrorException('Failed to create OTP');
  }

  async getStoredOTP(email: string): Promise<Otp> {
    const storedOTP = await this.otpModel.findOne({ email }).sort({'createdAt':-1}).exec();
    if(storedOTP==null) throw new BadRequestException('OTP Expired')
    return storedOTP;
  }
  async compareOTP(otp: number, userEnteredOTP: number): Promise<boolean> {
    return otp == userEnteredOTP;
  }
}
