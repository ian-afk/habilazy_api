import { IsNotEmpty } from 'class-validator';

export class CreateSubTaskDto {
  @IsNotEmpty()
  task: string;

  description?: string;

  @IsNotEmpty()
  taskId: number;

  @IsNotEmpty()
  userId: number;
}
