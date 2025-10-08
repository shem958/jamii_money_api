import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Chama extends Document {
    @Prop({ required: true })
    name: string;

    // 👇 Relationships
    @Prop({ type: [{ type: Types.ObjectId, ref: 'ChamaMember' }] })
    members: Types.ObjectId[];
}

export const ChamaSchema = SchemaFactory.createForClass(Chama);
