import { Injectable, NotFoundException } from '@nestjs/common';

import { SubtaskRepository } from './repositories/subtask.repository';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubtaskService {
  constructor(private readonly subtaskRepo: SubtaskRepository) {}

  async findAllSubTask() {
    const subTask = await this.subtaskRepo.find();
    return subTask;
  }

  async createSubTask(createSubTaskDto: CreateSubTaskDto) {
    const newSubTask = await this.subtaskRepo.create(createSubTaskDto);

    return newSubTask;
  }

  async findSubTaskById(id: number) {
    const subTask = await this.subtaskRepo.findById(id);
    return subTask;
  }

  async findSubTaskByIdAndUpdate(id: number, updateSubTask: UpdateSubTaskDto) {
    const subTask = await this.subtaskRepo.findByIdAndUpdate(id, updateSubTask);

    return subTask;
  }

  async findSubTaskAndDelete(id: number) {
    const isExists = await this.subtaskRepo.findById(id);

    if (!isExists) {
      throw new NotFoundException(`Subtask with id: ${id} doesn't exists`);
    }

    return {
      message: 'Subtask deleted successfully',
    };
  }
}
