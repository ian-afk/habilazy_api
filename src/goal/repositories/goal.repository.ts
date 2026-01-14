import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/primsa.service';
import { Goal } from 'src/prisma/prisma.client';
import { CreateGoalDto } from '../dto/create-goal.dto';
import { UpdateGoalDto } from '../dto/update-goal.dto';

@Injectable()
export class GoalRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Goal[] | null> {
    return await this.prisma.goal.findMany();
  }

  async create(data: CreateGoalDto) {
    return await this.prisma.goal.create({ data });
  }

  async findById(id: number): Promise<Goal | null> {
    return await this.prisma.goal.findUnique({
      where: { id },
    });
  }

  async findByIdAndUpdate(id: number, data: UpdateGoalDto) {
    return await this.prisma.goal.update({
      where: { id },
      data,
    });
  }

  async findByIdAndDelete(id: number) {
    return await this.prisma.goal.delete({
      where: { id },
    });
  }
}
