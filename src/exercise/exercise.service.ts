import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from '../database/repositories/exercise.repository';

@Injectable()
export class ExerciseService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  getExercises() {
    return this.exerciseRepository.findAll();
  }
}
