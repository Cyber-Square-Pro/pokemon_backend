import mongoose, { Schema } from 'mongoose';

export const FavouritesSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    pokemon: {
      type: [String],
      default: [],
    },
  },
  { collection: 'favourites' },
);

export interface Favourite extends mongoose.Document {
  user: string;
  pokemon: string[];
}
