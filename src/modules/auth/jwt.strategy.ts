import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import type { Request } from 'express';
import { JwtPayload } from './interfaces/jwt-payload.interface';

function extractFromCookieOrHeader(req: Request): string | null {
  const cookies = (req as Request & { cookies?: Record<string, string> })
    .cookies;
  const token = cookies?.['access_token'];
  if (token) return token;
  const auth = req?.headers?.authorization;
  if (auth?.startsWith('Bearer ')) return auth.slice(7);
  return null;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly config: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (req: Request) => extractFromCookieOrHeader(req),
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),
      secretOrKey: config.get<string>('JWT_SECRET'),
    });
  }

  async validate(payload: JwtPayload): Promise<{ id: number; email: string }> {
    if (!payload?.sub) throw new UnauthorizedException();
    return { id: payload.sub, email: payload.email };
  }
}
