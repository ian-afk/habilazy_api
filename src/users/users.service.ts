import { Injectable, NotFoundException } from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from 'src/generated/prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';

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

  async findUserAndUpdate(id: number, updateUserDto: UpdateUserDto) {
    const isExist = await this.userRepo.findById(id);
    if (!isExist) {
      throw new NotFoundException(`User ID ${id} doesn't exists`);
    }

    const user = await this.userRepo.findByIdAndUpdate(id, updateUserDto);

    return user;
  }

  async findUserAndDelete(id: number) {
    const isExist = await this.userRepo.findById(id);

    if (!isExist) {
      throw new NotFoundException(`User ID ${id} doesn't exists`);
    }

    await this.userRepo.findByIdAndDelete(id);

    return {
      message: `User deleted successfully`,
    };
  }
}
