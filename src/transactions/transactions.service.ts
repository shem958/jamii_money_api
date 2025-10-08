import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Transaction } from './schemas/transaction.schema';

@Injectable()
export class TransactionsService {
    constructor(@InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>) { }

    async create(createTransactionDto: any) {
        const transaction = new this.transactionModel(createTransactionDto);
        return await transaction.save();
    }

    async findAll() {
        return this.transactionModel.find().populate('userId', 'name email');
    }

    async findOne(id: string) {
        const transaction = await this.transactionModel.findById(id).populate('userId', 'name email');
        if (!transaction) throw new NotFoundException('Transaction not found');
        return transaction;
    }

    async update(id: string, updateTransactionDto: any) {
        const updated = await this.transactionModel.findByIdAndUpdate(id, updateTransactionDto, { new: true });
        if (!updated) throw new NotFoundException('Transaction not found');
        return updated;
    }

    async remove(id: string) {
        const deleted = await this.transactionModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Transaction not found');
        return { message: 'Transaction deleted successfully' };
    }
}
