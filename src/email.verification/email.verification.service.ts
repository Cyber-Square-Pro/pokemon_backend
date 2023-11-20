import { Injectable } from '@nestjs/common'
import {MailerService } from '../mailer/mailer.service'
@Injectable()
export class EmailVerificationService {
    constructor(private readonly mailerService: MailerService) {}

    async sendVerificationEmail(email: string, otp: number):Promise<boolean> {
     const res =  await this.mailerService.sendVerificationEmail(email,otp);
      if(res) return true
      else return false

    }
  
    async verifyEmail(otp: number, userEnteredOTP: number): Promise<boolean> {
      return  otp == userEnteredOTP;
    }
}
