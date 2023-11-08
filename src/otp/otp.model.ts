import * as mongoose from 'mongoose';

export const OtpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

export interface Otp {
  email: string;
  otp: string;
  createdAt: Date;
}
