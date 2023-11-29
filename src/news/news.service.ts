import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { News } from './news.model';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class NewsService {
  constructor(@InjectModel('News') readonly newsModel: Model<News>) {}

  async getAllArticles(page: number = 1, pageSize: number = 5): Promise<News[]> {
    try {
      const skip = (page - 1) * pageSize;
      const news = await this.newsModel.find().skip(skip).limit(pageSize).exec();
      return news;
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }

  async getOneArticle(newsId: number): Promise<News> {
    try {
      return await this.newsModel.findOne({ newsId: newsId });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}


// import {
//   Injectable,
//   InternalServerErrorException,
//   NotFoundException,
// } from '@nestjs/common';
// import { News } from './news.model';
// import { Model } from 'mongoose';
// import { InjectModel } from '@nestjs/mongoose';

// @Injectable()
// export class NewsService {
//   constructor(@InjectModel('News') readonly newsModel: Model<News>) {}
//   // function to get all news
//   async getAllArticles() {
//     const news =  await this.newsModel.find().exec();
//     if(news.length>0) return news
//     else return []
//   }

//   async getOneArticle(newsId: number): Promise<News> {
//     try {
//       return await this.newsModel.findOne({ newsId: newsId });
//     } catch (err) {
//       throw new NotFoundException(err);
//     }
//   }

// }
