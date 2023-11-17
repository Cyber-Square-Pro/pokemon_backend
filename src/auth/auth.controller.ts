// auth/auth.controller.ts
import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Request() req) {
    console.log(req.query);
    return this.authService.loginUser(req.query.user, req.query.password);
  }
}
