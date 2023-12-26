import { Body, Controller, Patch, Post } from '@nestjs/common';
import { UserService } from 'src/users/users.service';

@Controller('credits')
export class CreditsController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async getCredits(@Body() body: { username: string }) {}

  @Post('create')
  async createAccount(@Body() body: { username: string }) {}

  @Patch('add')
  async addCredits(@Body() body: { username: string }) {}

  @Patch('spend')
  async spendCredits(@Body() body: { username: string; amount: number }) {}
}
