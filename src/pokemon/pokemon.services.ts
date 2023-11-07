import { Injectable, NotFoundException } from '@nestjs/common';
import { Pokemon } from './pokemon.model';

@Injectable()
export class PokemonService {
  pokemon: Pokemon[] = [];


// Fetching one pokemon from the DB
  getOnePokemon(id: number) {
    const [pokemon, _] = this.findPokemonByID(id);
    return { ...pokemon };
  }

// Returning a copied list of all pokemons from the DB 
  getAllpokemon() {
    return [...this.pokemon];
  }


  // Common find 1 Method
  private findPokemonByID(id: number): [Pokemon, number] {
    const index = this.pokemon.findIndex((user) => pokemon.id == id);
    const pokemon = this.pokemon[index];
    if (!pokemon) throw new NotFoundException('Could not find this pokemon');
    console.log(index, pokemon);
    return [pokemon, index];
  }
}
