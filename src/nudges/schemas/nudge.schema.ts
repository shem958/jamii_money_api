import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export enum NudgeType {
  REMINDER = 'reminder',
  TIP = 'tip',
  ALERT = 'alert',
}

@Schema({ timestamps: true })
export class Nudge extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  message: string;

  @Prop({ required: true, enum: NudgeType })
  type: NudgeType;

  @Prop({ required: true })
  scheduledAt: Date;

  @Prop({ default: false })
  read: boolean;
}

export const NudgeSchema = SchemaFactory.createForClass(Nudge);
