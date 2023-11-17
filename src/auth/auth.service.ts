import { Injectable } from '@nestjs/common';
import { UserService } from '../users/users.services';
// import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async loginUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findUserByEmail(email);

    if (user && user.password == password) {
      return user;
    }
    return null;
  }
}
