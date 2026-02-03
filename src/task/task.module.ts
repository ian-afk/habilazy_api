import { Module } from '@nestjs/common';
import { TaskService } from './task.service';
import { TaskController } from './task.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { TaskRepository } from './repositories/task.repository';
import { GoalModule } from 'src/goal/goal.module';

import { GoalRepository } from 'src/goal/repositories/goal.repository';

@Module({
  imports: [PrismaModule, GoalModule],
  providers: [TaskService, TaskRepository, GoalRepository],
  controllers: [TaskController],
})
export class TaskModule {}
