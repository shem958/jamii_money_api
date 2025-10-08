import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class ChamaMember extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: Types.ObjectId;

    @Prop({ type: Types.ObjectId, ref: 'Chama', required: true })
    chamaId: Types.ObjectId;

    @Prop({ required: true })
    role: string; // admin / member

    @Prop({ default: 0 })
    amount: number;
}

export const ChamaMemberSchema = SchemaFactory.createForClass(ChamaMember);
