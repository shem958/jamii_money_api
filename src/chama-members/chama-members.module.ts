import { Module } from '@nestjs/common';
import { ChamaMembersService } from './chama-members.service';
import { ChamaMembersController } from './chama-members.controller';

@Module({
  providers: [ChamaMembersService],
  controllers: [ChamaMembersController]
})
export class ChamaMembersModule {}
