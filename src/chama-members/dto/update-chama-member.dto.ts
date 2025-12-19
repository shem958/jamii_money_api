import { PartialType } from '@nestjs/mapped-types';
import { CreateChamaMemberDto } from './create-chama-member.dto';

export class UpdateChamaMemberDto extends PartialType(CreateChamaMemberDto) {}
