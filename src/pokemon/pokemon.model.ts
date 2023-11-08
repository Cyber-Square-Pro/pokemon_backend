import mongoose from 'mongoose';

export const PokemonSchema = new mongoose.Schema({
  number: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  thumbnailUrl: {
    type: String,
    required: true,
  },
  sprites: {
    mainSpriteUrl: {
      type: String,
      required: true,
    },
    frontAnimatedSpriteUrl: {
      type: String,
      required: true,
    },
    backAnimatedSpriteUrl: {
      type: String,
      required: true,
    },
    frontShinyAnimatedSpriteUrl: {
      type: String,
      required: true,
    },
    backShinyAnimatedSpriteUrl: {
      type: String,
      required: true,
    },
  },
  types: [
    {
      type: String,
      required: true,
    },
  ],
  specie: {
    type: String,
    required: true,
  },
  generation: {
    type: String,
    required: true,
  },
});

export interface Pokemon extends mongoose.Document {
  number: string;
  name: string;
  imageUrl: string;
  thumbnailUrl: string;
  sprites: {
    mainSpriteUrl: string;
    frontAnimatedSpriteUrl: string;
    backAnimatedSpriteUrl: string;
    frontShinyAnimatedSpriteUrl: string;
    backShinyAnimatedSpriteUrl: string;
  };
  types: string[];
  specie: string;
  generation: string;
}
