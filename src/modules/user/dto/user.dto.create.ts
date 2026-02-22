import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ example: 'test@gmail.com'})
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '102030'})
  @IsNotEmpty()
  password: string;
}
