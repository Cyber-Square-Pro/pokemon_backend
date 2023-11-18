// jwt-auth.guard.ts
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenGuard } from '../refresh.token/refresh-token.guard';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly refreshTokenGuard: RefreshTokenGuard) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Check both the access token and refresh token before allowing access
    return (await super.canActivate(context)) && (await this.refreshTokenGuard.canActivate(context));
  }
}
