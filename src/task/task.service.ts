import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskRepository } from './repositories/task.repository';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from 'src/prisma/prisma.client';

import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TaskService {
  constructor(private readonly taskRepo: TaskRepository) {}

  async listAllTask() {
    return await this.taskRepo.find();
  }

  async createTask(createTaskDto: CreateTaskDto) {
    return await this.taskRepo.create(createTaskDto);
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
