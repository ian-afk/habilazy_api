import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { UsersService } from 'src/users/users.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
  imports: [PassportModule.register({ session: false })],
  providers: [UsersService, JwtStrategy, AuthService, UsersService],
  controllers: [AuthController],
})
export class AuthModule {}
