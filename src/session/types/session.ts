import { Exercise } from '../../database/entities';

export type Break = {
  type: 'break';
  duration: number;
};

export type TimeExercise = {
  type: 'timeExercise';
  exercise: Exercise;
  duration: number;
};

export type RepetitionsExercise = {
  type: 'repetitionsExercise';
  exercise: Exercise;
  repetitions: number;
};

export type SessionStep = Break | TimeExercise | RepetitionsExercise;
