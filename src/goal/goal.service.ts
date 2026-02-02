import { Injectable, NotFoundException } from '@nestjs/common';
import { GoalRepository } from './repositories/goal.repository';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { Goal } from 'src/generated/prisma/client';

@Injectable()
export class GoalService {
  constructor(private readonly goalRepo: GoalRepository) {}
  async listAllTask(): Promise<Goal[]> {
    const goals = (await this.goalRepo.findAll()) || [];
    return goals;
  }

  async createGoal(createGoalDto: CreateGoalDto) {
    const goal = createGoalDto;

    return await this.goalRepo.create(goal);
  }

  async findGoalById(id: number) {
    const goal = await this.goalRepo.findById(id);
    if (!goal) {
      throw new NotFoundException(`Goal with id: ${id} not found`);
    }
    return goal;
  }

  async findGoalAndUpdate(id: number, updateGoalDto: UpdateGoalDto) {
    const goal = await this.goalRepo.findByIdAndUpdate(id, updateGoalDto);

    if (!goal) {
      throw new NotFoundException(`Goal with id: ${id} not found`);
    }

    return goal;
  }

  async findGoalAndDelete(id: number) {
    const isExist = await this.goalRepo.findById(id);
    if (!isExist) {
      throw new NotFoundException(`Goal with id: ${id} not found`);
    }
    await this.goalRepo.findByIdAndDelete(id);
    return {
      success: true,
      message: 'Goal deleted Successfuly',
    };
  }
}
