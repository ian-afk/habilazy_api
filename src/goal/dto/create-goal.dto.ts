import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  userId: number;
}
