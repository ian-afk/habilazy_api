import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Request } from 'express';

import { User } from 'src/generated/prisma/client';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Get()
  async getAllUser(): Promise<User[]> {
    const users = await this.userService.listAllUser();
    return users;
  }
  @Post('signup')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const newUser = this.userService.createUser({ email, password });
    return await newUser;
  }

  @Get('/:id')
  async getAllUsers(@Param('id') id: string) {
    return await this.userService.findUserById(Number(id));
  }

  @Patch('/:id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    const updateUser = this.userService.findUserAndUpdate(
      Number(id),
      updateUserDto,
    );

    return updateUser;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.userService.findUserAndDelete(Number(id));
  }
}
