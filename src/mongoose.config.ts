import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || '';
export const mongooseConfig: MongooseModuleOptions = {
  uri: MONGO_URI,
  dbName: 'pokemon_db',
};
