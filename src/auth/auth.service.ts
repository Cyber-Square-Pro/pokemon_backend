// auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.services';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';
import { RefreshToken } from '../refresh.token/refresh-token.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async register(
    name: string,
    email: string,
    phone: number,
    password: string,
  ): Promise<User> {
    return await this.userService.createUser(name, email, phone, password);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findUserByEmail(email);

    if (user && (await this.comparePasswords(password, user.password))) {
      // Generate access token
      const accessToken = this.generateAccessToken({ email: user.email });

      // Generate refresh token
      const refreshToken = await this.generateRefreshToken(user);

      return { ...user, accessToken, refreshToken };
    }

    throw new NotFoundException('Invalid Credentials');
  }

  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '2m',
    });
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const token = this.jwtService.sign(
      { email: user.email },
      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      },
    );

    // Create a new RefreshToken document
    const refreshToken = new RefreshToken({ token, user: user._id })
    await refreshToken.save()

    return token;
  }

  private async comparePasswords(
    enteredPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, storedPassword)
  }
}
