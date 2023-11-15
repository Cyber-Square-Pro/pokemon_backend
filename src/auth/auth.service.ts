import { Injectable } from '@nestjs/common';
import { UserService } from 'src/users/users.services';

@Injectable()
export class AuthService {
    constructor(private readonly userService:UserService){}

    async validateUser(email: string, password: string) {
        const user = await this.userService.findUserByEmail(email);
        if (user && user.password === password) {
          // Return the user object if valid
          return user;
        }
        return null;
      }
}
