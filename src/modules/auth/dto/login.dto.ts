import { IsEmail, IsNotEmpty } from 'class-validator';

export class UserSiginDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}