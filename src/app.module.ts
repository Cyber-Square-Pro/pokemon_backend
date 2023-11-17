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
import { UserService } from './users/users.services';
import { UserSchema } from './users/user.model';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forRoot('mongodb://localhost:27017/pokemon_db'),
    AuthModule,
    PokemonModule,
    EmailVerificationModule,
    OtpModule,
    MailerModule,
  ],
  controllers: [AppController, AuthController],
  providers: [UserService,AppService, MailerService,  AuthService],
})
export class AppModule {}
