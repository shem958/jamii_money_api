import { Module } from '@nestjs/common';
import { ChamasService } from './chamas.service';
import { ChamasController } from './chamas.controller';

@Module({
  providers: [ChamasService],
  controllers: [ChamasController]
})
export class ChamasModule {}
