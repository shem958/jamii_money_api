import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ChamaMembersService } from './chama-members.service';

@Controller('chama-members')
export class ChamaMembersController {
    constructor(private readonly chamaMembersService: ChamaMembersService) { }

    @Post()
    create(@Body() createMemberDto: any) {
        return this.chamaMembersService.create(createMemberDto);
    }

    @Get()
    findAll() {
        return this.chamaMembersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.chamaMembersService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateMemberDto: any) {
        return this.chamaMembersService.update(id, updateMemberDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.chamaMembersService.remove(id);
    }
}
