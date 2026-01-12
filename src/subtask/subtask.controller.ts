import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { SubtaskService } from './subtask.service';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';

@Controller('subtask')
export class SubtaskController {
  constructor(private readonly subTaskService: SubtaskService) {}

  @Get()
  async getAllSubTask() {
    return await this.subTaskService.findAllSubTask();
  }

  @Post()
  async createSubTask(@Body() createSubTaskDto: CreateSubTaskDto) {
    return await this.subTaskService.createSubTask(createSubTaskDto);
  }

  @Get('/:id')
  async getSubTaskById(@Param('id') id: string) {
    const subTask = await this.subTaskService.findSubTaskById(Number(id));
    return subTask;
  }

  @Patch('/:id')
  async updateSubTask(
    @Param('id') id: string,
    @Body() UpdateSubTaskDto: UpdateSubTaskDto,
  ) {
    const subTask = await this.subTaskService.findSubTaskByIdAndUpdate(
      Number(id),
      UpdateSubTaskDto,
    );

    return subTask;
  }

  @Delete('/:id')
  async deleteSubTask(@Param('id') id: string) {
    return await this.subTaskService.findSubTaskAndDelete(Number(id));
  }
}
