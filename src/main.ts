import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { mongooseConfig } from './mongoose.config';

async function bootstrap() {
  dotenv.config();
  const PORT = process.env.PORT || 3000;

  await mongooseConnect();

  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
}

async function mongooseConnect() {
  const mongoose = require('mongoose');

  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI, mongooseConfig);

    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    process.exit(1);
  }
}

bootstrap();
