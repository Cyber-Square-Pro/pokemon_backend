import mongoose, { Schema } from "mongoose";

export const FavouritesSchema = new mongoose.Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:'User',
        required:true,
        unique:true
    },
    pokemon:{
        type:[String],
        unique:true,
        default:[]
    }
},{collection:'favourites'})

export interface Favourite extends mongoose.Document{
    user:string;
    pokemon:string[]
}