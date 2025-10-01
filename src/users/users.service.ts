import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
    async create(createUserDto: any) {
        return { message: 'User created', data: createUserDto };
    }

    async findAll() {
        return { message: 'All users', data: [] };
    }

    async findOne(id: string) {
        return { message: `User ${id}`, data: {} };
    }

    async update(id: string, updateUserDto: any) {
        return { message: `User ${id} updated`, data: updateUserDto };
    }

    async remove(id: string) {
        return { message: `User ${id} deleted` };
    }
}
