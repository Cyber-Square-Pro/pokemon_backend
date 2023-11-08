import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from './otp.model';

@Injectable()
export class OtpService {
  constructor(@InjectModel('Otp') readonly otpModel:Model<Otp>){}

  generateOTP(): string {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    return otp;
  }

  async storeOTP(email: string, otp: string): Promise<boolean> {
    const storedOTP = new this.otpModel({
      email,
      otp
    })
    const result = await storedOTP.save()
    if(result) return true
    else return false
  }

  async getStoredOTP(email: string): Promise<string> {
    const storedOTP = await this.otpModel.findOne({email:email})
    console.log(storedOTP)
    return storedOTP.otp
  }
}
