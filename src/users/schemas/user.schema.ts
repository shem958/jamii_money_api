import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class User extends Document {
    @Prop({ required: true })
    name: string;

    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true, unique: true })
    phone: string;

    @Prop({ required: true })
    password: string;

    @Prop()
    payday: number; // salary date (e.g., 30)

    @Prop({ default: 'user', enum: ['user', 'admin'] })
    role: string; // 👈 Added this line
}

export const UserSchema = SchemaFactory.createForClass(User);
