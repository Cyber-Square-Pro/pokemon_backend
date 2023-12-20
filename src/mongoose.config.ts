import { MongooseModuleOptions } from '@nestjs/mongoose';
import * as dotenv from 'dotenv';

dotenv.config();

var local: string = 'mongodb://localhost:27017';
const prod = process.env.MONGO_URI;

const uri = prod;

const mongoUri = uri;
export const mongooseConfig: MongooseModuleOptions = {
  uri: mongoUri,
  dbName: 'pokemon_db',
};
