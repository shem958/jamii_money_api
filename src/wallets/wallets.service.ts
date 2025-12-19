import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Wallet } from './schemas/wallet.schema';

@Injectable()
export class WalletsService {
  constructor(
    @InjectModel(Wallet.name) private readonly walletModel: Model<Wallet>,
  ) {}

  async create(createWalletDto: any) {
    const wallet = new this.walletModel(createWalletDto);
    return await wallet.save();
  }

  async findAll() {
    return this.walletModel.find().populate('userId', 'name email phone');
  }

  async findOne(id: string) {
    const wallet = await this.walletModel
      .findById(id)
      .populate('userId', 'name email phone');
    if (!wallet) throw new NotFoundException('Wallet not found');
    return wallet;
  }

  async update(id: string, updateWalletDto: any) {
    const updated = await this.walletModel.findByIdAndUpdate(
      id,
      updateWalletDto,
      { new: true },
    );
    if (!updated) throw new NotFoundException('Wallet not found');
    return updated;
  }

  async remove(id: string) {
    const deleted = await this.walletModel.findByIdAndDelete(id);
    if (!deleted) throw new NotFoundException('Wallet not found');
    return { message: 'Wallet deleted successfully' };
  }
}
