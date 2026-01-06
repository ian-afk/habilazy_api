import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  task: string;

  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
