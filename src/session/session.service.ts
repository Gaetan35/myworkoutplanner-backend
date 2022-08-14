import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from '../database/repositories/exercise.repository';
import { GetSessionPropositionDTO } from './types/get-session-proposition.dto';
import {
  Break,
  RepetitionsExercise,
  SessionStep,
  TimeExercise,
} from './types/session';

@Injectable()
export class SessionService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async getSessionProposition(
    dto: GetSessionPropositionDTO,
  ): Promise<SessionStep[]> {
    const exercises = await this.exerciseRepository.findAll();
    const selectedExercises = exercises.sort(() => 0.5 - Math.random());

    const session = selectedExercises.flatMap<SessionStep>(
      (exercise, index): SessionStep[] => {
        const exerciseStep: TimeExercise | RepetitionsExercise =
          exercise.isTimeExercise
            ? {
                type: 'timeExercise',
                duration: 30,
                exercise,
              }
            : { type: 'repetitionsExercise', repetitions: 10, exercise };

        const breakStep: Break = { type: 'break', duration: 30 };

        if (index === 0) {
          return [exerciseStep];
        }

        return [breakStep, exerciseStep];
      },
    );

    return session;
  }
}
