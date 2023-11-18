// app.controller.ts
import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // @UseGuards(AuthGuard('local'))
  @Post('auth-test')
  async login(@Request() req) {
    console.log(req.query)
    return 'auth success';
  }

  @Get()
  getHello(): string {
    return this.appService.homeRoute();
  }
}
