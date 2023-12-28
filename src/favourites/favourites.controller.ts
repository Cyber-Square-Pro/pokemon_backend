import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouritesService } from './favourites.service';
import { UserService } from 'src/users/users.service';
import { PokemonService } from 'src/pokemon/pokemon.services';

@Controller('favourites')
export class FavouritesController {
  constructor(
    private readonly favouritesService: FavouritesService,
    private readonly usersService: UserService,
    private readonly pokemonService: PokemonService,
  ) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async getFavourites(
    @Body() body: { username: string; favourites: string[] },
  ) {
    const user = await this.usersService.findUserByName(body.username);
    const favourites = await this.favouritesService.getFavourites(user);
    if (favourites == null) {
      return [];
    } else {
      return await this.pokemonService.getListOfPokemonByIds(favourites);
    }
  }
  @Patch('add')
  @UseGuards(AuthGuard('jwt'))
  async saveFavourite(@Body() body: { username: string; favourite: string }) {
    const user = await this.usersService.findUserByName(body.username);
    console.log('user trying to add favourite: ', user.name);
    return this.favouritesService.saveFavourite(user, body.favourite);
  }

  @Post('contains')
  @UseGuards(AuthGuard('jwt'))
  async containsFavourite(
    @Body() body: { username: string; favourite: string },
  ) {
    const user = await this.usersService.findUserByName(body.username);
    return await this.favouritesService.containsFavourite(user, body.favourite);
  }

  @Delete('remove')
  @UseGuards(AuthGuard('jwt'))
  async removeFavourite(@Body() body: { username: string; favourite: string }) {
    const user = await this.usersService.findUserByName(body.username);
    return await this.favouritesService.removeFavourite(user, body.favourite);
  }
}
