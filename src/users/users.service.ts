import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<User>) { }

    async create(createUserDto: any) {
        const user = new this.userModel(createUserDto);
        return await user.save();
    }

    async findAll() {
        return this.userModel
            .find()
            .populate('wallets')
            .populate('transactions')
            .populate('goals')
            .populate('nudges')
            .populate('chamaMemberships');
    }

    async findOne(id: string) {
        const user = await this.userModel
            .findById(id)
            .populate('wallets')
            .populate('transactions')
            .populate('goals')
            .populate('nudges')
            .populate('chamaMemberships');

        if (!user) throw new NotFoundException('User not found');
        return user;
    }

    async update(id: string, updateUserDto: any) {
        const updated = await this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true });
        if (!updated) throw new NotFoundException('User not found');
        return updated;
    }

    async remove(id: string) {
        const deleted = await this.userModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('User not found');
        return { message: 'User deleted successfully' };
    }
}
