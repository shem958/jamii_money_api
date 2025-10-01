import { Module } from '@nestjs/common';
import { NudgesService } from './nudges.service';
import { NudgesController } from './nudges.controller';

@Module({
  providers: [NudgesService],
  controllers: [NudgesController]
})
export class NudgesModule {}
