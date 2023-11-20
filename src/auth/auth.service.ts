// auth.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { User } from '../users/user.model';
import { RefreshTokenService } from 'src/refresh.token/refresh-token.service';
import { JwtStrategy } from './jwt.strategy';


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly jwtStrategy: JwtStrategy,
    private readonly refreshTokenService: RefreshTokenService,
  ) {}

  async register(
    username: string,
    email: string,
    phone: number,
    password: string,
  ): Promise<User> {
    return await this.userService.createUser(username, email, phone, password);
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findUserByName(username);

    if (user && (await this.comparePasswords(password, user.password))) {
      // Generate access token
      const accessToken = this.generateAccessToken({ username: user.name });

      // Generate refresh token
      const refreshToken = await this.generateRefreshToken(user);

      return {accessToken, refreshToken };
    }

    throw new NotFoundException('Invalid Credentials');
  }

  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '5m',
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
    await this.refreshTokenService.createRefreshToken(token,user._id);
  
    return token;
  }

  // Re-generating acccess token
  async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string } | null> {
    // Verify the refresh token
    const isValidRefreshToken = await this.jwtStrategy.verifyToken(refreshToken);

    if (isValidRefreshToken) {
      // Extract user email from the refresh token
      const decodedToken = this.jwtService.decode(refreshToken) as { username: string };
      const username = decodedToken.username;

      // Generate a new access token
      const accessToken = this.generateAccessToken({ username });
      return { accessToken };
    }

    return null;
  }
  

  private async comparePasswords(
    enteredPassword: string,
    storedPassword: string,
  ): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, storedPassword)
  }


  async logout(user: User): Promise<void> {
    await this.refreshTokenService.deleteRefreshToken(user._id);
  }
  
}
