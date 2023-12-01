import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, },
  phone_number: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

export interface User extends mongoose.Document {
  id: number;
  name: string;
  email: string;
  phone_number: number
  password: string;
}
