import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    userId: string;

    @IsNumber()
    amount: number;

    @IsEnum(['credit', 'debit'])
    type: 'credit' | 'debit';

    @IsString()
    @IsOptional()
    description?: string;
}
