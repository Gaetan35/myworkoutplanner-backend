import { Controller, Get } from '@nestjs/common';
import { ExerciseService } from './exercise.service';

@Controller('api/exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('/')
  getExercises() {
    return this.exerciseService.getExercises();
  }
}
