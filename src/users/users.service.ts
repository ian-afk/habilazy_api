import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from 'src/generated/prisma/client';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async listAllUser(): Promise<User[]> {
    const users = await this.userRepo.find();
    return users;
  }
  async createUser(createUserDto: CreateUserDto) {
    const user = this.userRepo.create(createUserDto);
    return await user;
  }

  async findUserById(id: number): Promise<User | null> {
    const user = await this.userRepo.findById(id);

    if (!user) {
      throw new NotFoundException(`User with user id:${id} not found`);
    }

    return user;
  }
}
