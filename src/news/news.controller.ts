import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
  @UseGuards(AuthGuard('jwt'))
  async getAllNews() {
    return await this.newsService.getAllArticles();
  }
  @Post()
  @UseGuards(AuthGuard('jwt'))
  async getOneNews(@Body('id') id: number) {
    return await this.newsService.getOneArticle(id);
  }

  @Post('add')
  async createArticle(
    @Body() body: { title: string; author: string; content: string },
  ) {
    return await this.newsService.postOneArticle(
      body.title,
      body.author,
      body.content,
    );
  }
}
