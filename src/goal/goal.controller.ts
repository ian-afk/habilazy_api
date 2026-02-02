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
    const goals = await this.goalService.listAllTask();
    if (goals.length === 0)
      return { success: true, message: 'No record goals found' };
    return {
      success: true,
      data: goals,
    };
  }

  @Post()
  async createGoal(@Body() createGoalDto: CreateGoalDto) {
    const goals = await this.goalService.createGoal(createGoalDto);
    return {
      success: true,
      data: goals,
    };
  }

  @Get('/:id')
  async getGoalById(@Param('id') id: string) {
    const goal = await this.goalService.findGoalById(Number(id));

    return {
      success: true,
      data: goal,
    };
  }

  @Patch('/:id')
  async updateGoal(
    @Param('id') id: string,
    @Body() updateGoalDto: UpdateGoalDto,
  ) {
    const goal = await this.goalService.findGoalAndUpdate(
      Number(id),
      updateGoalDto,
    );

    return {
      success: true,
      data: goal,
    };
  }

  @Delete('/:id')
  async deleteGoal(@Param('id') id: string) {
    return await this.goalService.findGoalAndDelete(Number(id));
  }
}
