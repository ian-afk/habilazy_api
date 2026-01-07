import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateTaskDto {
  @IsString()
  task?: string;
  description?: string;

  @IsNotEmpty()
  userId: number;
}
