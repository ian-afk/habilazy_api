import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';

export type JwtPayload = {
  sub: string;
  email: string;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    private userService: UsersService,
    private configService: ConfigService,
  ) {
    const extractJwtFromCookie = (req: Request) =>
      req?.cookies?.['access_token'] ??
      ExtractJwt.fromAuthHeaderAsBearerToken()(req);

    const jwtSecret = configService.get<string>('JWT_SECRET');

    if (!jwtSecret) {
      throw new Error('JWT_SECRET environment varial is not defined');
    }

    super({
      ignoreExpiration: false,
      secretOrKey: jwtSecret,
      jwtFromRequest: extractJwtFromCookie,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.userService.findUserById(Number(payload.sub));

    if (!user) throw new UnauthorizedException('Please log in to continue');

    return {
      id: payload.sub,
      email: payload.email,
    };
  }
}
