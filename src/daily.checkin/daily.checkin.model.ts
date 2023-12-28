import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Document } from 'mongoose';

@Schema({ timestamps: true, collection: 'daily_check_in' })
export class DailyCheckin {
    @Prop({ required: true, ref: 'User' })
    user: ObjectId;

    @Prop({ required: true, default: false })
    isCheckedIn: boolean;

    @Prop({ required: true, default: false })
    isCreatedByCron: boolean;
}

export type DailyCheckinDocument = DailyCheckin & Document;

export const DailyCheckinSchema = SchemaFactory.createForClass(DailyCheckin);
