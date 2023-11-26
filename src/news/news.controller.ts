import { Body, Controller, Get, InternalServerErrorException, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { NewsService } from './news.service';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}
  @Get()
//   @UseGuards(AuthGuard('jwt'))
  async getAllNews() {
    return await this.newsService.getAllArticles();
  }


  @Post('add')
  async createArticle(
    @Body() body: { title: string; author: string; content: string },
  ) {
    try{
      return await this.newsService.postOneArticle(
        body.title,
        body.author,
        body.content,
      );
    } catch(err){
      throw new InternalServerErrorException(err)
    }
  }
  @Post('add-many')
  async createManyArticles(
    @Body() articles: { title: string; author: string; content: string }[],
  ) {
    return await this.newsService.postManyArticles(articles);
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async getOneNews(@Body('id') id: number) {
    return await this.newsService.getOneArticle(id);
  }
}
