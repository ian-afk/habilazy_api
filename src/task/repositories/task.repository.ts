import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/primsa.service';
import { CreateTaskDto } from '../dto/create-task.dto';
import { Prisma, Task } from 'src/prisma/prisma.client';
import { UpdateTaskDto } from '../dto/update-task.dto';

@Injectable()
export class TaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateTaskDto): Promise<Task> {
    const task = await this.prisma.task.create({ data });
    return task;
  }

  async find(where: Prisma.TaskWhereInput): Promise<Task[]> {
    return await this.prisma.task.findMany({
      where,
    });
  }

  async findById(id: number): Promise<Task | null> {
    return await this.prisma.task.findUnique({
      where: { id },
    });
  }

  async findByIdAndUpdate(id: number, data: UpdateTaskDto) {
    return await this.prisma.task.update({
      where: { id },
      data,
    });
  }

  async findByIdAndDelete(id: number) {
    return await this.prisma.task.delete({
      where: { id },
    });
  }
}
