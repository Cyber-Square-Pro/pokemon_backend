import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { UserService } from './users.services';

@Controller('products')
export class UsersController {
  constructor(private readonly usersService: UserService){}

  // Get one user
  @Get('/:id')
  getUser(@Param('id') id:number):any{
    return this.usersService.getOneUser(id)
  }

  // Get all Users Info
  @Get()
  getAllUsers():any{
    return this.usersService.getAllUsers()
  }

  // Add User
  @Post()
  createUser(@Body() body:{
    name:string,
    email:string,
    phone:number,
    password:string,
  }): any {
    return this.usersService.createUser(body.name, body.email, body.phone,body.password)
  }

  // Update a User
  @Patch(':id')
  updateUser(
    @Param('id') id:number, 
    @Body('name') name:string,
    @Body('email') email:string,
    @Body('phone') phone:number,
    @Body('password') password:string,
  ){
    this.usersService.updateUser(id, name,email,phone,password)
    return null
  }

  // Delete a User
  @Delete(':id')
  deleteUser(@Param('id') id){
    this.usersService.deleteUser(id)
    return null
  }
}