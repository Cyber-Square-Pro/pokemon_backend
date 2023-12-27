import { Body, Controller, Patch, Post, UseGuards } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { CreditsService } from './credits.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('credits')
export class CreditsController {
  constructor(
    private readonly userService: UserService,
    private readonly creditService: CreditsService,
  ) {}

  @UseGuards(AuthGuard('jwt'))
  @Post()
  async getCredits(@Body() body: { username: string }) {
    const user = await this.userService.findUserByName(body.username);
    const result = await this.creditService.getCredits(user);
    return {credits:result.credits};
  }
  @UseGuards(AuthGuard('jwt'))
  @Post('create')
  async createAccount(@Body() body: { username: string }) {
    const user = await this.userService.findUserByName(body.username);
    return this.creditService.createAccount(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('add')
  async addCredits(@Body() body: { username: string }) {
    const user = await this.userService.findUserByName(body.username);
    return this.creditService.addCredits(user);
  }
  @UseGuards(AuthGuard('jwt'))
  @Patch('spend')
  async spendCredits(@Body() body: { username: string; amount: number }) {
    const user = await this.userService.findUserByName(body.username);
    return this.creditService.spendCredits(user, body.amount);
  }
}
