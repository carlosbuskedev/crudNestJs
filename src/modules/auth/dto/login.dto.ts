import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class UserSiginDto {
  @ApiProperty({ example: 'test@gmail.com' })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.trim().toLowerCase() : value,
  )
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '102030' })
  @IsNotEmpty()
  password: string;
}
