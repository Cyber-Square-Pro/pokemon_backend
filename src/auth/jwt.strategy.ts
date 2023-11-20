// jwt.strategy.ts
import { Strategy, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../users/users.service';
import { JwtPayload } from './jwt-payload.interface';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh.token/refresh-token.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly refreshTokenService: RefreshTokenService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.ACCESS_TOKEN_SECRET,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findUserByName(payload.username);
    const userHasRefreshTokenInDB = await this.refreshTokenService.findRefreshTokenByUserId(user._id)
    console.log(user.email,userHasRefreshTokenInDB!=null)
    if (!user || !userHasRefreshTokenInDB) {
      throw new UnauthorizedException();
    }
    return user;
  }

  async verifyToken(token: string): Promise<boolean> {
    console.log('refresh token verification function called')
    try {
      const decodedToken = this.jwtService.verify(token, {
        secret: process.env.REFRESH_TOKEN_SECRET,
      });
      const refreshToken =
        await this.refreshTokenService.findRefreshToken(token);
      return !!refreshToken && decodedToken.email == refreshToken.user
    } catch (error) {
      return false;
    }
  }
}
