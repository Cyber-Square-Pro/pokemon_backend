// refresh-token.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({ collection: 'refreshtokens' })
export class RefreshToken extends Document {
  @Prop({ required: true })
  token: string;
  
  @Prop({ type: 'ObjectId', ref: 'User', required: true,  })
  userId: string;

  @Prop({ type: 'String',  required: true, })
  email: string;
  
  @Prop({ default: Date.now})
  createdAt: Date;
  
}
export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
