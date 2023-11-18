// refresh-token.guard.ts
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtStrategy } from '../auth/jwt.strategy';

@Injectable()
export class RefreshTokenGuard implements CanActivate {
  constructor(private readonly jwtStrategy: JwtStrategy) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    console.log('can activate called')
    const request = context.switchToHttp().getRequest();
    const refreshToken = request.headers.authorization?.split(' ')[1];
    console.log(refreshToken)
    if (!refreshToken) {
      return false;
    }

    return this.jwtStrategy.verifyToken(refreshToken);
  }
}
