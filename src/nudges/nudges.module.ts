import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { NudgesService } from './nudges.service';
import { NudgesController } from './nudges.controller';
import { Nudge, NudgeSchema } from './schemas/nudge.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Nudge.name, schema: NudgeSchema }])
  ],
  providers: [NudgesService],
  controllers: [NudgesController],
  exports: [NudgesService]
})
export class NudgesModule { }
