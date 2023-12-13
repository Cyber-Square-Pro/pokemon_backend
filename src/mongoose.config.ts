import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const mongoUri = process.env.MONGO_URI;
export const mongooseConfig: MongooseModuleOptions = {
  uri:mongoUri,
  dbName: 'pokemon_db',
};
