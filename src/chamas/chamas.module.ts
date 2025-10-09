import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ChamasService } from './chamas.service';
import { ChamasController } from './chamas.controller';
import { Chama, ChamaSchema } from './schemas/chama.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Chama.name, schema: ChamaSchema }])
  ],
  providers: [ChamasService],
  controllers: [ChamasController],
  exports: [ChamasService]
})
export class ChamasModule { }
