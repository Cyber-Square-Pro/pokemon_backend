import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';
import { EmailVerificationModule } from './email.verification/email.verification.module';
import { MailerService } from './mailer/mailer.service';
import { OtpModule } from './otp/otp.module';
import { MailerModule } from './mailer/mailer.module';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { UserService } from './users/users.service';
import { UserSchema } from './users/user.model';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from './refresh.token/refresh-token.service';
import { RefreshTokenSchema } from './refresh.token/refresh-token.model';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),

    JwtModule.register({
      secret:process.env.ACCESS_TOKEN_SECRET,
      signOptions:{
        algorithm:'HS256',
        expiresIn:'2m'
      }
    }),
    UsersModule,

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: 'RefreshToken', schema: RefreshTokenSchema },
    ]),
    MongooseModule.forRoot('mongodb://localhost:27017/pokemon_db'),
    AuthModule,
    PokemonModule,
    EmailVerificationModule,
    OtpModule,
    MailerModule,
  ],
  controllers: [AppController, AuthController],
  providers: [
    JwtStrategy,
    UserService,
    JwtService,
    AppService,
    MailerService,
    RefreshTokenService,
    AuthService,
  ],
})
export class AppModule {}
