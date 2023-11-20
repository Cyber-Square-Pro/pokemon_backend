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
    const result = this.usersService.findAllUsers();
    return result;
  }

  // Create one user
  // @Post('sign-up')
  // async registerUser(
  //   @Body()
  //   body: {
  //     name: string;
  //     email: string;
  //     phone_number: number;
  //     password: string;
  //   },
  // ) {
  //     const result = await this.usersService.createUser(
  //       body.name,
  //       body.email,
  //       body.phone_number,
  //       body.password,
  //     );
  //   if (result) return {message:'Created user succesfully'};
  //   else throw new InternalServerErrorException('Failed to create user')

  // }

  //Update User
  @Patch(':id')
  @UseGuards(AuthGuard('jwt'))
  updateUser(
    @Param('id') id: string,
    @Body()
    body: {
      username: string;
      email: string;
      phone_number: number;
      password: string;
    },
  ) {
    const updatedUser = this.usersService.updateUserById(
      id,
      body.username,
      body.email,
      body.phone_number,
      body.password,
    );
    if (updatedUser) return updatedUser;
    else throw new InternalServerErrorException('Unable to update user');
  }

  // delete user by id
  @Delete(':id')
  deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUserById(id);
  }

  @Post('send-verification-email')
  async sendVerificationEmail(@Body('email') email: string) {
    // Generating a random OTP and storing that + user's email
    const generatedOTP = this.otpService.generateOTP();
    await this.otpService.storeOTP(email, generatedOTP);
    const res = await this.emailVerificationService.sendVerificationEmail(
      email,
      generatedOTP,
    );
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
  ) {
    const storedOtp = await this.otpService.getStoredOTP(email);
    const validity = 2 * 60 * 1000;

    // Calculate the difference between current time and OTP creation time
    const currentTime = new Date();
    const timeDifference =
      currentTime.getTime() - storedOtp.createdAt.getTime();

    if (timeDifference < validity) {
      const verifyResult = await this.emailVerificationService.verifyEmail(
        storedOtp.otp,
        userEnteredOTP,
      );

      if (verifyResult) {
        return true;
      } else {
        throw new BadRequestException('Invalid OTP');
      }
    } else {
      throw new BadRequestException('Invalid OTP');
    }
  }
}
