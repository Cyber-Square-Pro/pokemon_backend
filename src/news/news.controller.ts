import { Body, Controller, Get, InternalServerErrorException, Param, ParseIntPipe, Post, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllNews(@Query('page') page: number = 1, @Query('pageSize') pageSize: number = 10) {
    return await this.newsService.getAllArticles(page, pageSize);
  }

  // @Get(':id')
  // @UseGuards(AuthGuard('jwt'))
  // async getOneNews(@Param('id', ParseIntPipe) id: number) {
  //   return await this.newsService.getOneArticle(id);
  // }
}
