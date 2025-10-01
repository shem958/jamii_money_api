import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { GoalsService } from './goals.service';

@Controller('goals')
export class GoalsController {
    constructor(private readonly goalsService: GoalsService) { }

    @Post()
    create(@Body() createGoalDto: any) {
        return this.goalsService.create(createGoalDto);
    }

    @Get()
    findAll() {
        return this.goalsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.goalsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateGoalDto: any) {
        return this.goalsService.update(id, updateGoalDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.goalsService.remove(id);
    }
}
