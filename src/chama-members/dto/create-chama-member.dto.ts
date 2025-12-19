import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateChamaMemberDto {
  @IsString()
  @IsNotEmpty()
  chamaId: string;

  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsOptional()
  role?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
