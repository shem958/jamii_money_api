import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChamaDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsArray()
  @IsOptional()
  members?: string[];

  @IsString()
  @IsOptional()
  createdBy?: string;
}
