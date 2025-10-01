import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Transaction extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ required: true })
    amount: number;

    @Prop({ required: true })
    category: string; // food, rent, transport, etc.

    @Prop({ required: true })
    type: string; // income / expense

    @Prop({ default: Date.now })
    date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
