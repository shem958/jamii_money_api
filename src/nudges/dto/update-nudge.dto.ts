import { PartialType } from '@nestjs/mapped-types';
import { CreateNudgeDto } from './create-nudge.dto';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateNudgeDto extends PartialType(CreateNudgeDto) {
    @IsBoolean()
    @IsOptional()
    read?: boolean;
}
