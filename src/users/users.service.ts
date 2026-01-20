import {
  ConflictException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './repositories/users.repository';
import { CreateUserDto } from './dto/create-user.dto';

import { User } from 'src/generated/prisma/client';
import { UpdateUserDto } from './dto/update-user.dto';
import bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private readonly userRepo: UsersRepository) {}

  async listAllUser(): Promise<User[]> {
    const users = await this.userRepo.find();
    return users;
  }
  async createUser(createUserDto: CreateUserDto) {
    const { email, password } = createUserDto;

    const isEmailExists = await this.userRepo.findByEmail(email);

    if (isEmailExists) {
      throw new ConflictException(`Email: ${email} already exists`);
    }

    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = this.userRepo.create({
        email,
        password: hashedPassword,
      });

      return await user;
    } catch (error) {
      throw new Error(error);
    }
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

  async findUserByEmail(email: string) {
    const user = await this.userRepo.findByEmail(email);

    if (!user) throw new UnauthorizedException('Invalid username or password');

    return user;
  }
}
