import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') readonly userModel: Model<User>) {}

  // Get one user
  async findUser(id:string){
    const user =  await this.findUser(id)
    return user
  }


  async findAllUsers() {
    const allUsers = await this.userModel.find();
    return allUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
    }))
  }

  async createUser(
    name: string,
    email: string,
    phone_number: number,
    password: string,
  ) {
    const newUser = new this.userModel({ name, email, phone_number, password });
    const result = await newUser.save()
    console.log(result)
  }

  private async  findOneUser(id:string):Promise<User>{
    let user
    try{
      user = await this.userModel.findById(id)
    } catch(error){
      throw new NotFoundException('Could not find this user')
    }
    if(!user){
        throw new NotFoundException('Could not find this user')
      }
      return user
  }
}
