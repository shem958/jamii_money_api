import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Goal } from './schemas/goal.schema';

@Injectable()
export class GoalsService {
    constructor(@InjectModel(Goal.name) private readonly goalModel: Model<Goal>) { }

    async create(createGoalDto: any) {
        const goal = new this.goalModel(createGoalDto);
        return await goal.save();
    }

    async findAll() {
        return this.goalModel.find().populate('userId', 'name email');
    }

    async findOne(id: string) {
        const goal = await this.goalModel.findById(id).populate('userId', 'name email');
        if (!goal) throw new NotFoundException('Goal not found');
        return goal;
    }

    async update(id: string, updateGoalDto: any) {
        const updated = await this.goalModel.findByIdAndUpdate(id, updateGoalDto, { new: true });
        if (!updated) throw new NotFoundException('Goal not found');
        return updated;
    }

    async remove(id: string) {
        const deleted = await this.goalModel.findByIdAndDelete(id);
        if (!deleted) throw new NotFoundException('Goal not found');
        return { message: 'Goal deleted successfully' };
    }
}
