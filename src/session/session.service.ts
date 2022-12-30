import { Injectable } from '@nestjs/common';
import { ExerciseRepository } from '../database/repositories/exercise.repository';
import { GetSessionPropositionDTO } from './types/get-session-proposition.dto';
import {
  Break,
  RepetitionsExercise,
  SessionStep,
  TimeExercise,
} from './types/session';
import { SessionType } from './types/sessionType';

@Injectable()
export class SessionService {
  constructor(private readonly exerciseRepository: ExerciseRepository) {}

  async getSessionProposition({
    sessionType,
    intensity,
    exerciseDifficulty,
  }: GetSessionPropositionDTO): Promise<SessionStep[]> {
    const seriesNumber = 3;
    const exercisesPerSeries = Math.round(Math.random() * 4 + 6);
    const breakTimeBetweenSeries = Math.round(Math.random() * 39 + 90);
    const sessionStructure = ['Cardio', 'Jambes', 'Abs', 'Gainage'];
    const minDifficulty = Math.max(exerciseDifficulty - 1, 1);
    const maxDifficulty = Math.min(exerciseDifficulty + 1, 5);
    const isTimeExercise = sessionType === SessionType.TABATA;

    const allExercises = await this.exerciseRepository.findAll();
    const selectedExercises = allExercises.filter(
      (exercise) =>
        exercise.difficulty >= minDifficulty &&
        exercise.difficulty <= maxDifficulty &&
        exercise.isTimeExercise === isTimeExercise,
    );
    const exercisesByCategory = sessionStructure.reduce(
      (acc, category) => ({
        ...acc,
        [category]: selectedExercises.filter((exercise) =>
          exercise.categories
            .map((exerciseCategory) => exerciseCategory.name)
            .includes(category),
        ),
      }),
      {},
    );

    const restTime = Math.round(Math.random() * 6 + 20);
    const effortTime = Math.round(Math.random() * 6 + 20);
    const serieFormat = {
      [SessionType.TABATA]: {
        1: { effortTime, restTime },
        2: { effortTime: effortTime + 2, restTime: restTime - 2 },
        3: { effortTime: effortTime + 4, restTime: restTime - 4 },
      },
      [SessionType.SERIES]: {
        1: {
          repetitions: Math.round(Math.random() * 5 + 6),
          restTime: Math.round(restTime / 2),
        },
        2: {
          repetitions: Math.round(Math.random() * 3 + 10),
          restTime: Math.round(restTime / 2),
        },
        3: {
          repetitions: Math.round(Math.random() * 6 + 12),
          restTime: Math.round(restTime / 2),
        },
      },
    };

    const serie = Array.from({
      length: exercisesPerSeries,
    }).flatMap<SessionStep>((_, index): SessionStep[] => {
      const category = sessionStructure[index % sessionStructure.length];
      const exercise =
        exercisesByCategory[category][
          Math.floor(Math.random() * exercisesByCategory[category].length)
        ];

      const exerciseStep: TimeExercise | RepetitionsExercise = {
        type: exercise.isTimeExercise ? 'timeExercise' : 'repetitionsExercise',
        exercise,
        ...(exercise.isTimeExercise && {
          duration: serieFormat.tabata[intensity].effortTime,
        }),
        ...(!exercise.isTimeExercise && {
          repetitions: serieFormat.series[intensity].repetitions,
        }),
      };

      const breakStep: Break = {
        type: 'break',
        duration: serieFormat[sessionType][intensity].restTime,
      };

      if (index === 0) {
        return [exerciseStep];
      }

      return [breakStep, exerciseStep];
    });

    const breakBetweenSeries: Break = {
      type: 'break',
      duration: breakTimeBetweenSeries,
    };
    const session = Array.from({ length: seriesNumber })
      .flatMap(() => [...serie, breakBetweenSeries])
      .slice(0, -1);

    return session;
  }
}
