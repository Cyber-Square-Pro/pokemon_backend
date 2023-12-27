import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Double, ObjectId } from 'mongodb';

@Schema({ timestamps: true, collection: 'credits' })
export class Credits {
  @Prop({ required: true, ref: 'User' })
  user: ObjectId;
  @Prop({ default: 0.00 })
  credits: Number;
}
export type CreditsDocument = Credits & Document;

export const CreditsSchema = SchemaFactory.createForClass(Credits);
