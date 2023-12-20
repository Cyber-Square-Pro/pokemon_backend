import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'daily_check_in' })
export class DailyCheckin {
  @Prop({ required: true })
  username: string;
}

export type DailyCheckinDocument = DailyCheckin & Document;

export const DailyCheckinSchema = SchemaFactory.createForClass(DailyCheckin);
