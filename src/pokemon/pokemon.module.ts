import { Module } from "@nestjs/common";
import { PokemonController } from "./pokemon.controllers";
import { PokemonService } from "./pokemon.services";

@Module({
    controllers:[PokemonController],
    providers:[PokemonService]
})
export class PokemonModule{}