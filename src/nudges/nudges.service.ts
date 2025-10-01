import { Injectable } from '@nestjs/common';

@Injectable()
export class NudgesService {
    async create(createNudgeDto: any) {
        return { message: 'Nudge created', data: createNudgeDto };
    }

    async findAll() {
        return { message: 'All nudges', data: [] };
    }

    async findOne(id: string) {
        return { message: `Nudge ${id}`, data: {} };
    }

    async update(id: string, updateNudgeDto: any) {
        return { message: `Nudge ${id} updated`, data: updateNudgeDto };
    }

    async remove(id: string) {
        return { message: `Nudge ${id} deleted` };
    }
}
