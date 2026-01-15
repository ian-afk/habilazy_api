import { Injectable, NotFoundException } from '@nestjs/common';
import { GoalRepository } from './repositories/goal.repository';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';

@Injectable()
export class GoalService {
  constructor(private readonly goalRepo: GoalRepository) {}
  async findAllTask() {
    return await this.goalRepo.findAll();
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
    const isExist = await this.goalRepo.findById(id);

    if (!isExist) {
      throw new NotFoundException(`Goal with id: ${id} not found`);
    }
    const goal = await this.goalRepo.findByIdAndUpdate(id, updateGoalDto);
    return goal;
  }

  async findGoalAndDelete(id: number) {
    const isExist = await this.goalRepo.findById(id);
    if (!isExist) {
      throw new NotFoundException(`Goal with id: ${id} not found`);
    }
    return await this.goalRepo.findByIdAndDelete(id);
  }
}
