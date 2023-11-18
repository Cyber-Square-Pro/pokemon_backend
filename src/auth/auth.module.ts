// import { Module } from '@nestjs/common'
// import { PassportModule } from '@nestjs/passport'
// import { LocalStrategy } from './local.strategy'
// import { AuthService } from './auth.service'
// import { MongooseModule } from '@nestjs/mongoose'
// import { UserSchema } from '../users/user.model'
// import { UserService } from '../users/users.services'
// import { UsersModule } from 'src/users/users.module'

// @Module({
//   imports: [
//     PassportModule,
//     UsersModule,
//     MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
//   ],
//   controllers: [],
//   providers: [UserService,AuthService, LocalStrategy,],
// })
// export class AuthModule {}

// auth.module.ts
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from 'src/users/user.model';
import { UsersModule } from 'src/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from 'src/users/users.services';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      secretOrPrivateKey:process.env.JWT_SECRET,
      signOptions: { expiresIn: '24h' },
    }),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UserService,AuthService, JwtStrategy, ConfigService ],
  exports: [AuthService],
})
export class AuthModule {}
