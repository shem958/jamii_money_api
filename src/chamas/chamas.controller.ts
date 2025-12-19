import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { ChamasService } from './chamas.service';

@Controller('chamas')
export class ChamasController {
  constructor(private readonly chamasService: ChamasService) {}

  @Post()
  create(@Body() createChamaDto: any) {
    return this.chamasService.create(createChamaDto);
  }

  @Get()
  findAll() {
    return this.chamasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.chamasService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateChamaDto: any) {
    return this.chamasService.update(id, updateChamaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.chamasService.remove(id);
  }
}
