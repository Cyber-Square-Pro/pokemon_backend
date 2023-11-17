import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { LocalStrategy } from './local.strategy'
import { AuthService } from './auth.service'
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from '../users/user.model'
import { UserService } from '../users/users.services'
import { UsersModule } from 'src/users/users.module'

@Module({
  imports: [
    PassportModule,
    UsersModule,
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [],
  providers: [UserService,AuthService, LocalStrategy,],
})
export class AuthModule {}
