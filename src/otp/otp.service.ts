import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Otp } from './otp.model';

@Injectable()
export class OtpService {
  constructor(@InjectModel('Otp') readonly otpModel:Model<Otp>){}

  generateOTP(): number {
    const otp = Math.floor(100000 + Math.random() * 900000)
    return otp;
  }

  async storeOTP(email: string, otp: number):Promise<boolean> {
    const storedOTP = new this.otpModel({
      email,
      otp
    })
    const result = await storedOTP.save()
    if(result) return true
    else return false
  }

  async getStoredOTP(email: string):Promise<number> {
    const storedOTP = await this.otpModel.findOne({email:email})
    return storedOTP.otp
  }
}
