import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';

export class CreateSalesLeadDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsOptional()
  @IsString()
  message?: string;

  @IsNotEmpty({ message: 'Необходимо согласие с политикой обработки данных' })
  @IsBoolean()
  privacyPolicyAccepted: boolean;
}

