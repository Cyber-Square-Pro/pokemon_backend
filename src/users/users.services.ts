import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') readonly userModel: Model<User>) {}

  // find one user
  async findUser(id: string) {
    const user = await this.findOneUser(id);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      password: user.password,
    };
  }

  // find all users
  async findAllUsers() {
    const allUsers = await this.userModel.find();
    return allUsers.map((user) => ({
      id: user.id,
      name: user.name,
      email: user.email,
      phone_number: user.phone_number,
      password: user.password,
    }));
  }

  // create a new user
  async createUser(
    name: string,
    email: string,
    phone_number: number,
    password: string,
  ) {
    const newUser = new this.userModel({ name, email, phone_number, password });
    const result = await newUser.save();
    console.log(result);
    return newUser.id;
  }

  // update a user
  async updateUser(
    id: string,
    name: string,
    email: string,
    phone_number: number,
    password: string,
  ) {
    const updatedUser = await this.findOneUser(id);

    if (name) {
      updatedUser.name = name;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (phone_number) {
      updatedUser.phone_number = phone_number;
    }
    if (password) {
      updatedUser.password = password;
    }

    updatedUser.save();
  }

  // Helper method to find one user from mongo db
  private async findOneUser(id: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find this user');
    }
    if (!user) {
      throw new NotFoundException('Could not find this user');
    }
    return user;
  }
}
