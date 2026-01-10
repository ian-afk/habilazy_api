import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { TaskModule } from './task/task.module';
import { SubtaskModule } from './subtask/subtask.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UsersModule,
    PrismaModule,
    TaskModule,
    SubtaskModule,
  ],
})
export class AppModule {}
