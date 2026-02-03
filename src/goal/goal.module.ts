import { Module } from '@nestjs/common';
import { GoalService } from './goal.service';
import { GoalController } from './goal.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { GoalRepository } from './repositories/goal.repository';

@Module({
  imports: [PrismaModule],
  providers: [GoalService, GoalRepository],
  controllers: [GoalController],
  exports: [GoalService, GoalModule],
})
export class GoalModule {}
