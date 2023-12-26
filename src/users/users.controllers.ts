import {
  BadRequestException,
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './users.service';
import { EmailVerificationService } from 'src/email.verification/email.verification.service';
import { OtpService } from 'src/otp/otp.service';
import { AuthGuard } from '@nestjs/passport';


@Controller('users')
export class UsersController {
  constructor(
    private readonly usersService: UserService,
    private readonly emailVerificationService: EmailVerificationService,
    private readonly otpService: OtpService,
  ) {}

  // Get one user
  @Post()
  async getUserById(@Body('id') id: string) {
    const result = await this.usersService.findUserById(id);
    return result;
  }
  // Get one user by email
  @Post()
  async getUserByName(@Body('username') username: string) {
    const result = await this.usersService.findUserByName(username);
    return result;
  }
  @Get()
  async getAllUsers() {
    const result = await this.usersService.findAllUsers();
    return result;
  }
  @Patch('reset-password')
  async resetPassword(
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    try {
      const user = await this.usersService.findUserByEmail(email);
      return await this.usersService.updateUserById(
        user._id,
        null,
        null,
        null,
        password,
      );
    } catch (error) {
      throw new InternalServerErrorException('Failed to reset password', error);
    }
  }

  //Update User
  @Patch()
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @Body()
    body: {
      id: string;
      username: string;
      email: string;
      phone_number: string;
      password: string;
    },
  ) {
    const updatedUser = this.usersService.updateUserById(
      body.id,
      body.username,
      body.email,
      body.phone_number,
      body.password,
    );
    if (updatedUser) return updatedUser;
    else throw new InternalServerErrorException('Unable to update user');
  }

  @Post('send-otp')
  async sendOtpEmail(
    @Body('email') email: string,
    @Body('intent') intent: string,
  ) {
    const generatedOTP = this.otpService.generateOTP();
    await this.otpService.storeOTP(email, generatedOTP);
    const res = await this.emailVerificationService.sendOtpEmail(
      email,
      generatedOTP,
      intent,
    );
    console.log(res);
    if (res)
      return {
        message: `OTP has been sent to your mail-> OTP ${generatedOTP}`,
      };
    else throw new InternalServerErrorException('Failed to send OTP');
  }

  @Post('verify-email')
  async verifyEmail(
    @Body('email') email: string,
    @Body('otp') userEnteredOTP: number,
    @Body('intent') intent: string,
  ) {
    const storedOtp = await this.otpService.getStoredOTP(email);

    const verifyResult = await this.otpService.compareOTP(
      storedOtp.otp,
      userEnteredOTP,
    );
    if (verifyResult) {
      if (intent == 'SIGN_UP') {
        try {
          await this.usersService.setEmailToVerified(email);
          return { message: 'Verified email succesfully' };
        } catch (error) {
          throw new InternalServerErrorException('Unexpected error occured');
        }
      }
      return { message: 'Email confirmed' };
    } else {
      throw new BadRequestException('Invalid OTP');
    }
  }
}
