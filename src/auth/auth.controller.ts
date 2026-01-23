import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth-dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signin')
  async singin(@Body() authDto: AuthDto) {
    return await this.authService.signin(authDto);
  }

  @Post('/signup')
  async signup(@Body() authDto: AuthDto) {
    const { email, password } = authDto;
    return await this.authService.signUp(email, password);
  }
}
