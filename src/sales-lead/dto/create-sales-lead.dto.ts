import { IsNotEmpty, IsString, IsOptional, IsBoolean } from 'class-validator';
import { Type, Transform } from 'class-transformer';

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
  @Type(() => Boolean)
  @Transform(({ value, obj }) => value ?? obj.agree ?? false)
  privacyPolicyAccepted: boolean;
}

