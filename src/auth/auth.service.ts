import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth-dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtServie: JwtService,
    private readonly userService: UsersService,
  ) {}

  async signin(authDto: AuthDto) {
    const user = await this.userService.findUserByEmail(authDto.email);

    if (user) {
      const isPasswordCorrect = await bcrypt.compare(
        authDto.password,
        user.password,
      );

      if (!isPasswordCorrect)
        throw new UnauthorizedException('Invalid email or password');

      const token = await this.jwtServie.signAsync({
        sub: user.id,
        email: authDto.email,
      });

      return {
        token,
      };
    }
  }
}
