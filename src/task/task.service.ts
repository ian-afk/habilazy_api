import {
  BadRequestException,
  ConflictException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { TaskRepository } from './repositories/task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Prisma, Task } from 'src/prisma/prisma.client';

import { UpdateTaskDto } from './dto/update-task.dto';

import { GoalRepository } from 'src/goal/repositories/goal.repository';

@Injectable()
export class TaskService {
  constructor(
    private readonly taskRepo: TaskRepository,
    private readonly goalRepo: GoalRepository,
  ) {}

  async listAllTask() {
    return await this.taskRepo.find({});
  }

  async createTask(createTaskDto: CreateTaskDto) {
    try {
      const goalId = createTaskDto.goalId;
      const findGoal = await this.goalRepo.findById(goalId);
      if (!findGoal)
        throw new NotFoundException(`Goal ID: ${goalId} does not exists`);

      return await this.taskRepo.create(createTaskDto);
    } catch (error) {
      if (error instanceof HttpException) throw error;

      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        switch (error.code) {
          case 'P2002': {
            throw new ConflictException(`Task already existing`);
          }

          case 'P2003': {
            throw new BadRequestException(
              `Invalid reference (foreign key constraint).`,
            );
          }

          case 'P2025': {
            throw new NotFoundException(`Record not found.`);
          }

          default:
            throw new BadRequestException(`Database error: ${error.code}`);
        }
      }
      if (error instanceof Prisma.PrismaClientValidationError) {
        throw new BadRequestException(`Invalid input data.`);
      }
      throw new InternalServerErrorException(`Unexpected error.`);
    }
  }

  async findTaskById(id: number): Promise<Task | null> {
    const task = await this.taskRepo.findById(id);

    if (!task) {
      throw new NotFoundException(`Task with id:${id} not found`);
    }

    return task;
  }

  async findTaskAndUpdate(id: number, updateTaskDto: UpdateTaskDto) {
    const isExists = await this.taskRepo.findById(id);

    if (!isExists) {
      throw new NotFoundException(`Task with id:${id} doesn't exists`);
    }
    const task = await this.taskRepo.findByIdAndUpdate(id, updateTaskDto);

    return task;
  }

  async findTaskAndDelete(id: number) {
    const isExists = await this.taskRepo.findById(id);

    if (!isExists) {
      throw new NotFoundException(`Task with id:${id} doesn't exists`);
    }

    return {
      message: 'Task deleted successfully',
    };
  }
}
