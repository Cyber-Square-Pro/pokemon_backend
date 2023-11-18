// refresh-token.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RefreshToken } from './refresh-token.model';

@Injectable()
export class RefreshTokenService {
  constructor(@InjectModel('RefreshToken') private readonly refreshTokenModel: Model<RefreshToken>) {}

  async createRefreshToken(token:string,user: string,): Promise<RefreshToken> {
    const refreshToken = await this.refreshTokenModel.create({token:token,user:user})
    return refreshToken.save();
  } 

  async findRefreshToken(token: string): Promise<RefreshToken | null> {
    return this.refreshTokenModel.findOne({ token }).exec();
  }

  async deleteRefreshToken(token: string): Promise<void> {
    await this.refreshTokenModel.findOneAndDelete({ token }).exec();
  }
  async deleteRefreshTokenByUser(userId: string): Promise<void> {
    await this.refreshTokenModel.deleteMany({ user: userId }).exec();
  }
  
}
