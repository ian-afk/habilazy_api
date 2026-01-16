import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { GoalService } from './goal.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Controller('goal')
export class GoalController {
  constructor(private readonly goalService: GoalService) {}

  @Get()
  async getAllGoal() {
    return await this.goalService.listAllTask();
  }

  @Post()
  async createGoal(@Body() createGoalDto: CreateGoalDto) {
    return await this.goalService.createGoal(createGoalDto);
  }

  @Get('/:id')
  async getGoalById(@Param('id') id: string) {
    const goal = await this.goalService.findGoalById(Number(id));

    return goal;
  }

  @Patch('/id')
  async updateGoal(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    const goal = await this.goalService.findGoalAndUpdate(
      Number(id),
      updateGoalDto,
    );

    return goal;
  }

  @Delete('/:id')
  async deleteGoal(@Param('id') id: string) {
    return await this.goalService.findGoalAndDelete(Number(id));
  }
}
