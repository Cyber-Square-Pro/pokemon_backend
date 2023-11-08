import { Module } from '@nestjs/common';
import { PokemonController } from './pokemon.controllers';
import { PokemonService } from './pokemon.services';
import { PokemonSchema } from './pokemon.model';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Pokemon', schema: PokemonSchema }]),
  ],
  controllers: [PokemonController],
  providers: [PokemonService],
})
export class PokemonModule {}
