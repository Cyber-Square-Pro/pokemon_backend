import mongoose from 'mongoose';

export const NewsSchema = new mongoose.Schema({
  newsId:{
    type:Number,
    default: Math.round((Math.random()/100))
  },
  author:{
    type:String,
    required:true,
  },
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    unique:false,
    default: Date.now(),
  },
});

export interface News extends mongoose.Document {
  newsId:string,
  author:string,
  title: string;
  content: string;
  date: Date;
}
