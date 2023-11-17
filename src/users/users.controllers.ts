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
  async getUserById(@Param('id') id: string) {
    const foundUser = this.usersService.findUserById(id);
    console.log(foundUser)
  }
  // Get one user by email
  @Post()
  async getUserByEmail(@Body('email') email: string) {
    const foundUser = this.usersService.findUserByEmail(email);
    console.log(foundUser)
    return foundUser
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
    const updatedUser = this.usersService.updateUserById(
      id,
      body.name,
      body.email,
      body.phone_number,
      body.password,
    );
    return updatedUser
  }

  // delete user by id
  @Delete(':id')
  deleteUser(@Param('id') id:string){
    return this.usersService.deleteUserById(id)
  }


  @Post('send-verification-email')
  async sendVerificationEmail(@Body('email') email:string) {

    // Generating a random OTP and storing that + user's email
    const generatedOTP = this.otpService.generateOTP() 
    console.log(generatedOTP)
     this.otpService.storeOTP(email,generatedOTP)
    const res = await this.emailVerificationService.sendVerificationEmail(email, generatedOTP)
    if(res) return {'message':'OTP has been sent to your mail'}

  }

  @Post('verify-email')
  async verifyEmail(
    @Body('email') email: string,
    @Body('otp') userEnteredOTP: number,
  ) {
    
    // comparing the user entered otp (from otp entry screen) to the stored otp
    const storedOtp = await this.otpService.getStoredOTP(email);
    console.log(storedOtp) 
    const verifyResult =  await this.emailVerificationService.verifyEmail(storedOtp, userEnteredOTP)
    console.log(verifyResult)
    if(verifyResult) return {'message':"Succesfully Verified EMail"}
    else return {'message':'Failed to verify'}
  }
}

