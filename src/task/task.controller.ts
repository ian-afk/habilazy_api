import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  async getAllTask() {
    return await this.taskService.listAllTask();
  }

  @Post()
  async createTask(@Body() createTaskDto: CreateTaskDto) {
    return await this.taskService.createTask(createTaskDto);
  }

  @Get('/:id')
  async getTaskById(@Param('id') id: string) {
    const task = await this.taskService.findTaskById(Number(id));

    return task;
  }

  @Patch('/:id')
  async updateTask(
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const task = await this.taskService.findTaskAndUpdate(
      Number(id),
      updateTaskDto,
    );
    return task;
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    return await this.taskService.findTaskAndDelete(Number(id));
  }
}
