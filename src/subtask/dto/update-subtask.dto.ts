import { IsNotEmpty } from 'class-validator';

export class UpdateSubTaskDto {
  task?: string;

  description?: string;

  @IsNotEmpty()
  taskId: number;
  @IsNotEmpty()
  userId: number;
}
