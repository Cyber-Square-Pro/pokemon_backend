import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon } from './pokemon.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class PokemonService {
  constructor(@InjectModel('Pokemon') readonly pokemonModel: Model<Pokemon>) {}

  // Fetching one pokemon
  async getOnePokemon(id: string):Promise<Pokemon> {
    const foundPokemon = await this.findPokemonByID(id)
    return foundPokemon
  }

  // Returning a list of all pokemons
  async getAllpokemon():Promise<Pokemon[]> {
    return await this.pokemonModel.find()
  }
 
  
  private async findPokemonByID(id: string): Promise<Pokemon> {
    let pokemon:Pokemon
    try {
      pokemon = await this.pokemonModel.findById(id)
    } catch (error) {
      throw new NotFoundException('Could not find this pokemon')
    }
    if(!pokemon){
      throw new NotFoundException('Could not find this pokemon')
    }
    return pokemon
  }
}
