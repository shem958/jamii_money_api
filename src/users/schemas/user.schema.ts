import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

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
    role: string;

    // 👇 Relationships
    @Prop({ type: [{ type: Types.ObjectId, ref: 'Wallet' }] })
    wallets: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Transaction' }] })
    transactions: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Goal' }] })
    goals: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'Nudge' }] })
    nudges: Types.ObjectId[];

    @Prop({ type: [{ type: Types.ObjectId, ref: 'ChamaMember' }] })
    chamaMemberships: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
