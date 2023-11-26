import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') readonly userModel: Model<User>) {}

  // find one user
  async findUserById(id: string) {
    const user = await this.findOne(id);
    return user;
  }
  // find one user by username
  async findUserByName(name: string) {
    const user = await this.findOneByName(name);
    return user;
  }
  // find one user by email
  async findUserByEmail(email: string) {
    const user = await this.findOneByEmail(email);
    return user;
  }

  // find all users
  async findAllUsers() {
    const result = await this.userModel.find();
    return result.map((user) => ({
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
    let hashedPass = await bcrypt.hash(password, 3);
    // console.log(hashedPass)
    const newUser = new this.userModel({
      name,
      email,
      phone_number,
      password:hashedPass,
    });
    const result = await newUser.save();
    return result;
  }

  // update a user
  async updateUserById(
    id: string,
    name: string,
    email: string,
    phone_number: number,
    password: string,
  ) {
    const updatedUser = await this.findOne(id);

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
      password = await bcrypt.hash(password,3)
      updatedUser.password = password;
    }

    return updatedUser.save();
  }

  // Deleting a user from the db
  async deleteUserById(id: string): Promise<boolean> {
    const foundUser = this.findOne(id);
    const result = await (await foundUser).deleteOne();
    if (result) return true;
    else return false;
  }

  // Helper method to find one user from mongo db
  private async findOne(id: string): Promise<User> {
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
  // Helper method to find one user from mongo db
  private async findOneByName(name: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findOne({ name }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find this user');
    }
    if (!user) {
      throw new NotFoundException('Could not find this user');
    }
    return user;
  }
  private async findOneByEmail(email: string): Promise<User> {
    let user: User;
    try {
      user = await this.userModel.findOne({ email }).exec();
    } catch (error) {
      throw new NotFoundException('Could not find this user');
    }
    if (!user) {
      throw new NotFoundException('Could not find this user');
    }
    return user;
  }
}