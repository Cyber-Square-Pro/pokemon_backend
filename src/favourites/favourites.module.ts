import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FavouritesSchema } from './favourite.model';
import { FavouritesService } from './favourites.service';
import { PokemonService } from 'src/pokemon/pokemon.services';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { PokemonSchema } from 'src/pokemon/pokemon.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Favourite', schema: FavouritesSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'Pokemon', schema: PokemonSchema },
    ]),

  ],
  providers: [FavouritesService,PokemonService],
  exports: [FavouritesService],
})
export class FavouritesModule {}
