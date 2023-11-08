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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UserService) {}
  
  // Get one user
  @Get(':id')
  async getOneUser(@Param('id') id: string) {
    const foundUser = this.usersService.findUser(id);
    console.log(foundUser);
  }
@Get()
async getAllUsers(){
  const allUsers = this.usersService.findAllUsers()
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
    this.usersService.createUser(
      body.name,
      body.email,
      body.phone_number,
      body.password,
    );
  }

  //Update User
  @Patch(':id')
  updateProduct(
    @Param('id') id: string,
    @Body()
    body: {
      name: string;
      email: string;
      phone_number: number;
      password: string;
    },
  ) {

    
  }
}
