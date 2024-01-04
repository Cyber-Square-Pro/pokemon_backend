import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
import { mongooseConfig } from './mongoose.config';

async function bootstrap() {
    dotenv.config();
    const PORT = process.env.PORT || 3000;

    const app = await NestFactory.create(AppModule);
    await connectToDB().then(async (_)  =>
      await app.listen(PORT)
    );
   
}

bootstrap();

async function connectToDB() {
    const dbUri = mongooseConfig.uri;
    await mongoose.connect(dbUri, {
        dbName: 'pokemon_db',
        
    });
}
