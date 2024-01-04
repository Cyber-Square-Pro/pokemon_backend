// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from '../users/user.model';
import { UsersModule } from '../users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from '../users/users.service';
import { ConfigService } from '@nestjs/config';
import { RefreshTokenSchema } from '../refresh.token/refresh-token.model';
import { RefreshTokenService } from '../refresh.token/refresh-token.service';


@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.ACCESS_TOKEN_SECRET,
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
  ],
  providers: [
    UserService,
    AuthService,
    RefreshTokenService,
    JwtStrategy,
    ConfigService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
