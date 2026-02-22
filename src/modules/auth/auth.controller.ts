import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import type { Request, Response } from 'express';
import { AuthService } from 'src/modules/auth/auth.service';
import { UserSiginDto } from 'src/modules/auth/dto/login.dto';
import { JwtAuthGuard } from './jwt-auth.guard';

const COOKIE_NAME = 'access_token';
const COOKIE_MAX_AGE_MS = 3600 * 1000;

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  async sign(
    @Body() siginDto: UserSiginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.authService.signIn(
      siginDto.email,
      siginDto.password,
    );
    const isProduction = process.env.NODE_ENV === 'production';
    res.cookie(COOKIE_NAME, result.access_token, {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: COOKIE_MAX_AGE_MS,
      path: '/',
    });
    return { user: result.user };
  }

  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth('access-token')
  @Get('me')
  me(@Req() req: Request & { user: { id: number; email: string } }) {
    return { user: req.user };
  }

  @HttpCode(HttpStatus.OK)
  @Post('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    const isProduction = process.env.NODE_ENV === 'production';
    res.clearCookie(COOKIE_NAME, {
      path: '/',
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
    });
    return { ok: true };
  }
}
