import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskRepository } from './repositories/task.repository';

@Module({
  imports: [PrismaModule],
  providers: [TaskService, TaskRepository],
  controllers: [TaskController],
})
export class TaskModule {}
