import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { ExerciseService } from './exercise.service';

@Controller('api/exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Get('/')
  getExercises() {
    return this.exerciseService.getExercises();
  }

  @Post('/')
  createExercise(@Body() dto: CreateExerciseDTO) {
    return this.exerciseService.createExercise(dto);
  }
}
