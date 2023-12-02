// auth.service.ts
import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    const usernameExists = await this.userService.isUsernameTaken(username);
    const emailExists = await this.userService.isEmailTaken(email);
    const phoneNumberExists = await this.userService.isPhoneNumberTaken(phone);

    if (usernameExists != null) {
      throw new ConflictException('A User with this username already exists');
    } else if (emailExists != null) {
      throw new ConflictException('A User with this email already exists');
    } else if (phoneNumberExists != null) {
      throw new ConflictException('A User with this phone already exists');
    } else {
      return await this.userService.createUser(
        username,
        email,
        phone,
        password,
      );
    }
  }

  async login(
    username: string,
    password: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const user = await this.userService.findUserByName(username);
    if (!user.verified_email)
      throw new UnauthorizedException('Email has not been verified');

    if (user && (await this.comparePasswords(password, user.password))) {
      // Generate access token
      const accessToken = this.generateAccessToken({
        userId: user.id,
        username: user.name,
        email: user.email,
      });

      // Generate refresh token
      const refreshToken = await this.generateRefreshToken(user);
      return { accessToken, refreshToken };
    }

    throw new NotFoundException('User does not exist');
  }

  private generateAccessToken(payload: any): string {
    return this.jwtService.sign(payload, {
      secret: process.env.ACCESS_TOKEN_SECRET,
      expiresIn: '5m',
    });
  }

  private async generateRefreshToken(user: User): Promise<string> {
    const token = this.jwtService.sign(
      { username: user.name, email: user.email },

      {
        secret: process.env.REFRESH_TOKEN_SECRET,
        expiresIn: '7d',
      },
    );

    /* Create a new RefreshToken document if a refresh token 
    doesnt already exist against this user or if the token has expired */
    const existingTokenResult =
      await this.refreshTokenService.findRefreshTokenByUserId(user._id);

    if (existingTokenResult) {
      try {
        await this.jwtService.verify(existingTokenResult.token, {
          secret: process.env.REFRESH_TOKEN_SECRET,
        });
        console.log('A valid refresh token for this user already exists in DB');
        return existingTokenResult.token;
      } catch (error) {
        return token;
      }
    }
    // If a valid token still exists in the DB use that instead
    await this.refreshTokenService.createRefreshToken(token, user);

    return token;
  }

  // Re-generating acccess token
  async refreshAccessToken(
    refreshToken: string,
  ): Promise<{ accessToken: string } | null> {
    // Verify the refresh token
    const isValidRefreshToken =
      await this.jwtStrategy.verifyToken(refreshToken);

    if (isValidRefreshToken) {
      console.log('Token is valid');
      // Extract user email from the refresh token
      const decodedToken = this.jwtService.decode(refreshToken) as {
        username: string;
      };
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
    return await bcrypt.compare(enteredPassword, storedPassword);
  }

  async logout(user: User): Promise<void> {
    await this.refreshTokenService.deleteRefreshToken(user._id);
  }
}
