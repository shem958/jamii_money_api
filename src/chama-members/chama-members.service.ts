import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ChamaMember } from './schemas/chama-member.schema';
import { CreateChamaMemberDto } from './dto/create-chama-member.dto';

@Injectable()
export class ChamaMembersService {
  constructor(
    @InjectModel(ChamaMember.name)
    private readonly memberModel: Model<ChamaMember>,
  ) {}

  async create(createMemberDto: CreateChamaMemberDto) {
    const member = new this.memberModel(createMemberDto);
    return member.save();
  }

  async findAll() {
    return this.memberModel
      .find()
      .populate('userId', 'name email')
      .populate('chamaId', 'name');
  }

  async findOne(id: string) {
    const member = await this.memberModel
      .findById(id)
      .populate('userId', 'name email')
      .populate('chamaId', 'name');
    if (!member) throw new NotFoundException('Chama member not found');
    return member;
  }

  async update(id: string, updateMemberDto: Partial<CreateChamaMemberDto>) {
    const updated = await this.memberModel.findByIdAndUpdate(
      id,
      updateMemberDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Chama member not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.memberModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Chama member not found');
    return { message: 'Chama member deleted successfully' };
  }
}
