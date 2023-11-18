import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UserService } from './users.services';
import { EmailVerificationService } from 'src/email.verification/email.verification.service';
import { OtpService } from 'src/otp/otp.service';

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
  async getUserByEmail(@Body('email') email: string) {
    const result = await this.usersService.findUserByEmail(email);
    return result;
  }
  @Get()
  async getAllUsers() {
    const result = this.usersService.findAllUsers();
    return result;
  }

  // Create one user
  @Post('sign-up')
  async createUser(
    @Body()
    body: {
      name: string;
      email: string;
      phone_number: number;
      password: string;
    },
  ) {

      const result = await this.usersService.createUser(
        body.name,
        body.email,
        body.phone_number,
        body.password,
      );
    if (result) return {message:'Created user succesfully'};
    else throw new InternalServerErrorException('Failed to create user')
    
  }

  //Update User
  @Patch(':id')
  updateUser(
    @Param('id') id: string,
    @Body()
    body: {
      name: string;
      email: string;
      phone_number: number;
      password: string;
    },
  ) {
    const updatedUser = this.usersService.updateUserById(
      id,
      body.name,
      body.email,
      body.phone_number,
      body.password,
    );
    return updatedUser;
  }

  // delete user by id
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }

  @Post('send-verification-email')
  async sendVerificationEmail(@Body('email') email: string) {
    // Generating a random OTP and storing that + user's email
    const generatedOTP =  this.otpService.generateOTP();
    await this.otpService.storeOTP(email, generatedOTP);
    const res = await this.emailVerificationService.sendVerificationEmail(
      email,
      generatedOTP,
    );
    if (res)
      return { message: `OTP has been sent to your mail-> OTP ${generatedOTP}` };
    else throw new InternalServerErrorException('Failed to send OTP');
  }

  @Post('verify-email')
  async verifyEmail(
    @Body('email') email: string,
    @Body('otp') userEnteredOTP: number,
  ) {
    try {
      const storedOtp = await this.otpService.getStoredOTP(email);
      const verifyResult = await this.emailVerificationService.verifyEmail(
        storedOtp,
        userEnteredOTP,
      );

      if (verifyResult) {
        return { message: 'Successfully Verified Email' };
      } else {
        throw new BadRequestException('Failed to verify email: Invalid OTP');
      }
    } catch (error) {
      // Log the error for server-side debugging
      console.error('Error during email verification:', error);

      // Return a generic error response
      throw new InternalServerErrorException('Error during email verification\n ',error);
    }
  }
}
