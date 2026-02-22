import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserSiginDto } from 'src/modules/auth/dto/login.dto';
import { JwtAuthGuard } from 'src/modules/auth/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  sign(@Body() siginDto: UserSiginDto) {
    return this.authService.signIn(siginDto.email, siginDto.password);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  find() {
    return 'Hola mundo';
  }
}
