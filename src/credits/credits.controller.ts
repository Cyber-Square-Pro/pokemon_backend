import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UserService } from 'src/users/users.service';
import { CreditsService } from './credits.service';

@Controller('credits')
export class CreditsController {
  constructor(
    private readonly userService: UserService,
    private readonly creditService: CreditsService,
  ) {}

  @Post()
  async getCredits(@Body() body: { username: string }) {
    const user = await this.userService.findUserByName(body.username);
    const result = await this.creditService.getCredits(user);
    return result.credits;
  }

  @Post('create')
  async createAccount(@Body() body: { username: string }) {
    const user = await this.userService.findUserByName(body.username);
    return this.creditService.createAccount(user);
  }

  @Patch('add')
  async addCredits(@Body() body: { username: string }) {
    const user = await this.userService.findUserByName(body.username);
    return this.creditService.addCredits(user);
  }

  @Patch('spend')
  async spendCredits(@Body() body: { username: string; amount: number }) {
    const user = await this.userService.findUserByName(body.username);
    return this.creditService.spendCredits(user, body.amount);
  }
}
