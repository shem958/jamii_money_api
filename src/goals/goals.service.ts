import { Injectable } from '@nestjs/common';

@Injectable()
export class GoalsService {
    async create(createGoalDto: any) {
        return { message: 'Goal created', data: createGoalDto };
    }

    async findAll() {
        return { message: 'All goals', data: [] };
    }

    async findOne(id: string) {
        return { message: `Goal ${id}`, data: {} };
    }

    async update(id: string, updateGoalDto: any) {
        return { message: `Goal ${id} updated`, data: updateGoalDto };
    }

    async remove(id: string) {
        return { message: `Goal ${id} deleted` };
    }
}
