import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { AuthDto } from './dto/auth-dto';
import bcrypt from 'bcryptjs';
import { UsersRepository } from 'src/users/repositories/users.repository';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
    private readonly userRepo: UsersRepository,
  ) {}

  signToken = (id: string, email: string) => {
    const payload = { sub: id, email };
    return this.jwtService.signAsync(payload);
  };
  async signin(authDto: AuthDto) {
    const { email, password } = authDto;
    const user = await this.userRepo.findByEmail(email);

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = await this.signToken(user.id.toString(), user.email);

    return { token };
  }

  async signUp(email: string, password: string) {
    try {
      const findEmail = await this.userRepo.findByEmail(email);

      if (findEmail) throw new HttpException('Email already exits', 409);

      const user = await this.userService.createUser({
        email,
        password,
      });

      const token = await this.signToken(String(user.id), user.email);

      return token;
    } catch (error) {
      console.log(error);
    }
  }
}
