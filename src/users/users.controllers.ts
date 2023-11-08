import {
  Body,
  Controller,
  Delete,
  Get,
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
  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    const foundUser = this.usersService.findUser(id);
    console.log(foundUser)
  }
  @Get()
  async getAllUsers() {
    const allUsers = this.usersService.findAllUsers();
    return allUsers
  }

  // Create one user
  @Post()
  createUser(
    @Body()
    body: {
      name: string;
      email: string;
      phone_number: number;
      password: string;
    },
  ) {
    const result = this.usersService.createUser(
      body.name,
      body.email,
      body.phone_number,
      body.password,
    );
    return result;
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
    const updatedUser = this.usersService.updateUser(
      id,
      body.name,
      body.email,
      body.phone_number,
      body.password,
    );
    return updatedUser
  }

  //
  @Delete(':id')
  deleteUser(@Param('id') id:string){
    return this.usersService.deleteUser(id)
  }

  //
  //
  @Post('send-verification-email')
  async sendVerificationEmail(@Body() email:string): Promise<void> {
    const otp = this.otpService.generateOTP() // Implement a function to generate OTP.
    await this.emailVerificationService.sendVerificationEmail(email, otp)
   
  }

  @Post('verify-email')
  async verifyEmail(
    @Body('email') email: string,
    @Body('userInputOtp') userInputOtp: string,
  ) {
    
    const storedOtp = await this.otpService.getStoredOTP(email); // Implement a function to retrieve the stored OTP.
    return this.emailVerificationService.verifyEmail(storedOtp, userInputOtp)
  }
}



