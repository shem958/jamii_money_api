import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { NudgeType } from '../schemas/nudge.schema';

export class CreateNudgeDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsString()
    @IsNotEmpty()
    message: string;

    @IsEnum(NudgeType)
    @IsNotEmpty()
    type: NudgeType;

    @IsDateString()
    @IsOptional()
    scheduledAt?: Date;
}
