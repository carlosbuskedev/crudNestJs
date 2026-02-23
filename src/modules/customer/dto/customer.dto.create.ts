import { IsEmail, IsNotEmpty, MinLength, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class CustomerDto {
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ example: 'test@gmail.com' })
  email: string;

  @ApiProperty({ example: '33.683.111/0001-07' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/\D/g, '') : value,
  )
  @IsNotEmpty()
  @MinLength(14)
  @MaxLength(14)
  cnpj: string;

  @IsNotEmpty()
  @ApiProperty({ example: 'Facebook Serviços Online do Brasil LTDA' })
  razao_social: string;
}
