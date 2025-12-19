import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChamaMembersService } from './chama-members.service';
import { ChamaMembersController } from './chama-members.controller';
import { ChamaMember, ChamaMemberSchema } from './schemas/chama-member.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ChamaMember.name, schema: ChamaMemberSchema },
    ]),
  ],
  providers: [ChamaMembersService],
  controllers: [ChamaMembersController],
  exports: [ChamaMembersService],
})
export class ChamaMembersModule {}
