import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsNumber, IsInt, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CustomerRatDTO {
  @ApiProperty({ example: 'atendimento tal tal blablabla' })
  @MinLength(10)
  description: string;

  @IsNumber()
  @ApiProperty({ example: 100.0 })
  price: number;

  @Type(() => Number)
  @ApiProperty({ example: 1 })
  @IsInt()
  @IsPositive()
  customer_id: number;
}
