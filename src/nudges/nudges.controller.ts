import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { NudgesService } from './nudges.service';

@Controller('nudges')
export class NudgesController {
    constructor(private readonly nudgesService: NudgesService) { }

    @Post()
    create(@Body() createNudgeDto: any) {
        return this.nudgesService.create(createNudgeDto);
    }

    @Get()
    findAll() {
        return this.nudgesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.nudgesService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateNudgeDto: any) {
        return this.nudgesService.update(id, updateNudgeDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.nudgesService.remove(id);
    }
}
