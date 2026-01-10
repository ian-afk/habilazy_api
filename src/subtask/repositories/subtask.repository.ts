import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/primsa.service';
import { SubTask } from 'src/prisma/prisma.client';
import { CreateSubTaskDto } from '../dto/create-subtask.dto';
import { UpdateSubTaskDto } from '../dto/update-subtask.dto';

@Injectable()
export class SubtaskRepository {
  constructor(private readonly prisma: PrismaService) {}

  async find(): Promise<SubTask[]> {
    return await this.prisma.subTask.findMany();
  }

  async create(data: CreateSubTaskDto): Promise<SubTask> {
    const subTask = await this.prisma.subTask.create({ data });
    return subTask;
  }

  async findById(id: number): Promise<SubTask | null> {
    return await this.prisma.subTask.findUnique({
      where: { id },
    });
  }

  async findByIdAndUpdate(
    id: number,
    data: UpdateSubTaskDto,
  ): Promise<SubTask> {
    return await this.prisma.subTask.update({
      where: { id },
      data,
    });
  }

  async findByIdAndDelete(id: number) {
    return await this.prisma.subTask.delete({
      where: { id },
    });
  }
}
