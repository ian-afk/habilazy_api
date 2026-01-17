import {
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

interface JwtPayload {
  sub: string;
  email: string;
  providerId: 'local' | 'google';
}

export class AuthGuard implements CanActivate {
  // private readonly serviceSecret: string;
  private readonly jwtSecret: string;
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {
    // this.serviceSecret = this.configService.get('SERVICE_SECRET') as string;
    this.jwtSecret = this.configService.get('JWJT_ACCESS_SECRET') as string;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException();
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.jwtSecret,
      });
      request.user = {
        id: payload.sub,
        email: payload.email,
        provider: payload.providerId,
      };

      return true;
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    return type === 'Bearer' ? token : undefined;
  }
}
