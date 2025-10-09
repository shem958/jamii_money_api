import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GoalsService } from './goals.service';
import { GoalsController } from './goals.controller';
import { Goal, GoalSchema } from './schemas/goal.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Goal.name, schema: GoalSchema }])
  ],
  providers: [GoalsService],
  controllers: [GoalsController],
  exports: [GoalsService]
})
export class GoalsModule { }
