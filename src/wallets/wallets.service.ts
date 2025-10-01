import { Injectable } from '@nestjs/common';

@Injectable()
export class WalletsService {
    async create(createWalletDto: any) {
        return { message: 'Wallet created', data: createWalletDto };
    }

    async findAll() {
        return { message: 'All wallets', data: [] };
    }

    async findOne(id: string) {
        return { message: `Wallet ${id}`, data: {} };
    }

    async update(id: string, updateWalletDto: any) {
        return { message: `Wallet ${id} updated`, data: updateWalletDto };
    }

    async remove(id: string) {
        return { message: `Wallet ${id} deleted` };
    }
}
