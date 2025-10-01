import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema({ timestamps: true })
export class Wallet extends Document {
    @Prop({ type: Types.ObjectId, ref: 'User', required: true })
    userId: string;

    @Prop({ required: true })
    provider: string; // M-Pesa, Airtel, T-Kash

    @Prop({ default: 0 })
    balance: number;
}

export const WalletSchema = SchemaFactory.createForClass(Wallet);
