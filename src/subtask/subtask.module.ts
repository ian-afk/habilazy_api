import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { SubtaskController } from './subtask.controller';
import { SubtaskRepository } from './repositories/subtask.repository';

@Module({
  imports: [PrismaModule],
  providers: [SubtaskService, SubtaskRepository],
  controllers: [SubtaskController],
})
export class SubtaskModule {}
