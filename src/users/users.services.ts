import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.model';

@Injectable()
export class UserService {
  users: User[] = [];

  getOneUser(id: number) {
    const [user, _] = this.findUser(id);
    return { ...user };
  }

  getAllUsers() {
    return [...this.users];
  }

  createUser(name: string, email: string, phone: number, password: string) {
    const id = Math.random() * 10;
    const newUser = new User(id, name, email, phone, password);
    this.users.push(newUser);

    console.log(`Added User, new id: ${id}`);
  }
  // Update ()
  updateUser(
    id: number,
    name: string,
    email: string,
    phone: number,
    password: string,
  ) {
    const [foundUser, index] = this.findUser(id);
    const updatedUser = { ...foundUser };

    // Checking if and only update if each field is not null / valid
    if (name) {
      updatedUser.name = name;
    }
    if (email) {
      updatedUser.email = email;
    }
    if (phone) {
      updatedUser.phone_number = phone;
    }
    this.users[index] = updatedUser;
  }
  // Delete ()
  deleteUser(id: number) {
    const [_, index] = this.findUser(id);
    this.users.splice(index, 1);
  }

  // Common find 1 Method
  private findUser(id: number): [User, number] {
    const index = this.users.findIndex((user) => user.id == id);
    const user = this.users[index];
    if (!user) throw new NotFoundException('Could not find this User');
    console.log(index, user);
    return [user, index];
  }
}
