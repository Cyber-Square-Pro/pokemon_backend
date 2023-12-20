// // otp.schema.ts
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Document } from 'mongoose';

// @Schema()
// export class Otp {
//   @Prop({ required: true })
//   email: string;

//   @Prop({ required: true })
//   otp: number;

//   @Prop({ default: Date.now, expires: 120 })
//   createdAt: Date;
// }

// export type OtpDocument = Otp & Document;

// export const OtpSchema = SchemaFactory.createForClass(Otp);

// otp.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Timestamp } from 'mongodb';
import { Document } from 'mongoose';

@Schema({ timestamps: true }) // Add timestamps option here
export class Otp {
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  otp: number;

  @Prop({ expires: 120 })
  createdAt: Timestamp;
}

export type OtpDocument = Otp & Document;

export const OtpSchema = SchemaFactory.createForClass(Otp);
