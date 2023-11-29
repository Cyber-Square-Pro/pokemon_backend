import { Body, Controller, Get, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { FavouritesService } from './favourites.service';


@Controller('favourites')
export class NewsController {
  constructor(private readonly favouritesService: FavouritesService) {}
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async getFavourites(@Body() body:{username:string,favourites:string[]}) {
    
  }


  @Post()
  @UseGuards(AuthGuard('jwt'))
  async saveFavourites(@Body() body:{username:string, favourites: string[]}) {
    
  }
}
