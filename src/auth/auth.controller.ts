// auth.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Request,
  Delete,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../users/user.model';
import { JwtAuthGuard } from './auth.guard';
import { AuthGuard } from '@nestjs/passport';
// import { RefreshTokenGuard } from '../refresh.token/refresh-token.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('phone_number') phone: number,
    @Body('password') password: string,
  ): Promise<User> {
    return this.authService.register(name, email, phone, password);
  }

  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    return await this.authService.login(email, password);
  }


  @Delete('logout')
  async logout(@Request() req) {
    await this.authService.logout(req.user)
  }

  @Get('protected')
  @UseGuards(JwtAuthGuard)
  protected(@Request() req) {
    return { message: 'You are authorized to be here', user: req.user };
  }
}