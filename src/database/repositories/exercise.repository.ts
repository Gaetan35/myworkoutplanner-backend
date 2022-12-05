import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';

@Injectable()
export class ExerciseRepository {
  constructor(
    @InjectRepository(Exercise)
    private readonly exerciseTable: Repository<Exercise>,
  ) {}

  findAll(): Promise<Exercise[]> {
    return this.exerciseTable.find({ relations: ['categories'] });
  }

  save(exercise: Exercise): Promise<Exercise> {
    return this.exerciseTable.save(exercise);
  }
}
