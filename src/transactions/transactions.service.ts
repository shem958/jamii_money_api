import { Injectable } from '@nestjs/common';

@Injectable()
export class TransactionsService {
    async create(createTransactionDto: any) {
        return { message: 'Transaction created', data: createTransactionDto };
    }

    async findAll() {
        return { message: 'All transactions', data: [] };
    }

    async findOne(id: string) {
        return { message: `Transaction ${id}`, data: {} };
    }

    async update(id: string, updateTransactionDto: any) {
        return { message: `Transaction ${id} updated`, data: updateTransactionDto };
    }

    async remove(id: string) {
        return { message: `Transaction ${id} deleted` };
    }
}
