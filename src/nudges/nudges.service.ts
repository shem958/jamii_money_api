import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Nudge } from './schemas/nudge.schema';

@Injectable()
export class NudgesService {
  constructor(
    @InjectModel(Nudge.name) private readonly nudgeModel: Model<Nudge>,
  ) {}

  async create(createNudgeDto: any) {
    const nudge = new this.nudgeModel(createNudgeDto);
    return await nudge.save();
  }

  async findAll() {
    return this.nudgeModel.find().populate('userId', 'name email');
  }

  async findOne(id: string) {
    const nudge = await this.nudgeModel
      .findById(id)
      .populate('userId', 'name email');
    if (!nudge) throw new NotFoundException('Nudge not found');
    return nudge;
  }

  async update(id: string, updateNudgeDto: any) {
    const updated = await this.nudgeModel.findByIdAndUpdate(
      id,
      updateNudgeDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Nudge not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.nudgeModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Nudge not found');
    return { message: 'Nudge deleted successfully' };
  }
}
