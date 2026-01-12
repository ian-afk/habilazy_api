import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';

import { PrismaModule } from 'src/prisma/prisma.module';
import { SubtaskController } from './subtask.controller';

@Module({
  imports: [PrismaModule],
  providers: [SubtaskService],
  controllers: [SubtaskController],
})
export class SubtaskModule {}
