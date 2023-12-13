import mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone_number: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  verified_email: { type: Boolean, default: false },
});

export interface User extends mongoose.Document {
  id: number;
  name: string;
  email: string;
  phone_number: string;
  password: string;
  verified_email: boolean;
}
