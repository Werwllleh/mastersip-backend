import { IsEmail, IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateSalesLeadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  message?: string;
}
