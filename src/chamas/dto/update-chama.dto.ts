import { PartialType } from '@nestjs/mapped-types';
import { CreateChamaDto } from './create-chama.dto';

export class UpdateChamaDto extends PartialType(CreateChamaDto) {}
