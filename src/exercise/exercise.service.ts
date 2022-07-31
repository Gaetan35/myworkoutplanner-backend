import { Injectable } from '@nestjs/common';
import { IdGeneratorService } from '../common/id-generator.service';
import { Exercise } from '../database/entities';
import { ExerciseRepository } from '../database/repositories/exercise.repository';
import { CreateExerciseDTO } from './dto/create-exercise.dto';

@Injectable()
export class ExerciseService {
  constructor(
    private readonly exerciseRepository: ExerciseRepository,
    private readonly idGeneratorService: IdGeneratorService,
  ) {}

  getExercises() {
    return this.exerciseRepository.findAll();
  }

  createExercise(dto: CreateExerciseDTO) {
    const exercise = Exercise.fromDto(this.idGeneratorService.new(), dto);
    return this.exerciseRepository.save(exercise);
  }
}
