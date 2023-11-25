import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { News } from './news.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NewsService {
  constructor(@InjectModel('News') readonly newsModel: Model<News>) {}
  // function to get all news
  async getAllArticles() {
    const news =  await this.newsModel.find().exec();
    if(news.length>0) return news
    else return []
  }

  async getOneArticle(newsId: number): Promise<News> {
    try {
      return await this.newsModel.findOne({ newsId: newsId });
    } catch (err) {
      throw new NotFoundException(err);
    }
  }

  async postOneArticle(
    title: string,
    author: string,
    content: string,
  ): Promise<boolean> {
    try {
      await this.newsModel.create({ title, author, content });
      return true;
    } catch (err) {
      throw new InternalServerErrorException();
    }
  }

  async postManyArticles(
    articles: {
      title: string;
      author: string;
      content: string;
    }[],
  ): Promise<boolean> {
    try {
      await this.newsModel.insertMany(articles);
      return true;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
