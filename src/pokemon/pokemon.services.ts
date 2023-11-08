import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon } from './pokemon.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PokemonService {
  constructor(@InjectModel('Pokemon') readonly pokemonModel: Model<Pokemon>) {}

  // Fetching one pokemon from the DB
  getOnePokemon(id: number) {}

  // Returning a list of all pokemons
  getAllpokemon() {}
  // Common find 1 Method
  private async findPokemonByID(id: number): Promise<Pokemon> {
    return;
  }
}
