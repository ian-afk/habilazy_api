import { Module } from '@nestjs/common';
import { SubtaskService } from './subtask.service';

import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [SubtaskService],
})
export class SubtaskModule {}
