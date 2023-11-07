import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { PokemonModule } from './pokemon/pokemon.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost:27017'),
  UsersModule,
  PokemonModule
],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
