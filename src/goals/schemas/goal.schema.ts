import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Goal extends Document {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  userId: Types.ObjectId;

  @Prop({ required: true })
  title: string; // e.g., "School Fees"

  @Prop({ required: true })
  target: number;

  @Prop({ default: 0 })
  saved: number;

  @Prop({ required: true })
  deadline: Date;
}

export const GoalSchema = SchemaFactory.createForClass(Goal);
