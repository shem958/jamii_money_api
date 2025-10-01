import { Injectable } from '@nestjs/common';

@Injectable()
export class ChamasService {
    async create(createChamaDto: any) {
        return { message: 'Chama created', data: createChamaDto };
    }

    async findAll() {
        return { message: 'All chamas', data: [] };
    }

    async findOne(id: string) {
        return { message: `Chama ${id}`, data: {} };
    }

    async update(id: string, updateChamaDto: any) {
        return { message: `Chama ${id} updated`, data: updateChamaDto };
    }

    async remove(id: string) {
        return { message: `Chama ${id} deleted` };
    }
}
