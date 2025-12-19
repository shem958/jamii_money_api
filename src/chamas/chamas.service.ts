import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Chama } from './schemas/chama.schema';

@Injectable()
export class ChamasService {
  constructor(
    @InjectModel(Chama.name) private readonly chamaModel: Model<Chama>,
  ) {}

  async create(createChamaDto: any) {
    const chama = new this.chamaModel(createChamaDto);
    return await chama.save();
  }

  async findAll() {
    return this.chamaModel.find().populate('members', 'userId role amount');
  }

  async findOne(id: string) {
    const chama = await this.chamaModel
      .findById(id)
      .populate('members', 'userId role amount');
    if (!chama) throw new NotFoundException('Chama not found');
    return chama;
  }

  async update(id: string, updateChamaDto: any) {
    const updated = await this.chamaModel.findByIdAndUpdate(
      id,
      updateChamaDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Chama not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.chamaModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Chama not found');
    return { message: 'Chama deleted successfully' };
  }
}
