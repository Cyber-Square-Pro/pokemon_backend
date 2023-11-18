// auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.services';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(name: string, email:string,phone:number,password:string): Promise<string> {
    await this.userService.createUser(name, email,phone,password);
    return this.generateToken({ name });
  }

  async login(email: string, password: string): Promise<string> {
    const user = await this.userService.findUserByEmail(email);
    if (user && (await  bcrypt.compare(password, user.password))) {
      return this.generateToken({ email });
    }
    return null;
  }

  private generateToken(payload: any): string {
    return this.jwtService.sign(payload,{
      secret:process.env.JWT_SECRET,
    });
  }
}
