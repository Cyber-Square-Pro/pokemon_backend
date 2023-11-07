import { Controller, Get, Param } from '@nestjs/common';
import { PokemonModel } from './pokemon.model';
import { PokemonService } from './pokemon.services';

@Controller('pokemon')
export class PokemonController {
  constructor(private readonly pokemonService: PokemonService) {}

  // Get one pokemon's details
  @Get('/:id')
  getPokemon(@Param('id') id: number): any {
    return this.pokemonService.getOnePokemon(id);
  }

  // Get all Users Info
  @Get()
  getAllPokemon(): any {
    return this.pokemonService.getAllpokemon();
  }

  // Add a Pokemon
  // Update a pokemon
  // Delete a pokemon
}
