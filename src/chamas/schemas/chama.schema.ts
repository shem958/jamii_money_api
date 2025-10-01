import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Chama extends Document {
    @Prop({ required: true })
    name: string;
}

export const ChamaSchema = SchemaFactory.createForClass(Chama);
