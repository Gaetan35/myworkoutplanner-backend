import * as uuid from 'uuid';
import { Exercise } from '../../src/database/entities';
import { DataSource } from 'typeorm';
import { Category } from '../../src/database/entities/categories.entity';

const exercises = [
  {
    id: uuid.v4(),
    name: 'Mountain Climber 1',
    difficulty: 1,
    description: 'Position pompe, montée de genou au niveau des bras',
    isTimeExercise: false,
    categories: ['Abs', 'Cardio'],
  },
  {
    id: uuid.v4(),
    name: 'Mountain Climber 2',
    difficulty: 2,
    description: 'Position pompe, montée de genou au niveau du bras opposé',
    isTimeExercise: false,
    categories: ['Abs', 'Cardio'],
  },
  {
    id: uuid.v4(),
    name: 'Burpees 1',
    difficulty: 1,
    description: 'Départ debout, descente squat, position pompe, monté squat',
    isTimeExercise: false,
    categories: ['Pec', 'Cardio', 'Jambe'],
  },
  {
    id: uuid.v4(),
    name: 'Burpees 2',
    difficulty: 2,
    description:
      'Départ debout, descente squat, position pompe, pompe, montée squat sauté',
    isTimeExercise: false,
    categories: ['Pec', 'Cardio', 'Jambe'],
  },
  {
    id: uuid.v4(),
    name: 'Burpees 3',
    difficulty: 3,
    description:
      'Départ debout, descente squat, position pompe, pompe, monté squat sauté groupé',
    isTimeExercise: false,
    categories: ['Pec', 'Cardio', 'Jambe'],
  },
  {
    id: uuid.v4(),
    name: 'Planche-1',
    difficulty: 3,
    description: 'Gainage position planche',
    isTimeExercise: true,
    categories: ['Abs'],
  },
  {
    id: uuid.v4(),
    name: 'Side-Planche',
    difficulty: 3,
    description: 'Gainage de coté sur un coude',
    isTimeExercise: true,
    categories: ['Abs'],
  },
  {
    id: uuid.v4(),
    name: 'Chaise',
    difficulty: 3,
    description: 'Position chaise contre un mur',
    isTimeExercise: true,
    categories: ['Jambe'],
  },
];

export const createExercises = async (dataSource: DataSource) => {
  const existingExercises = await dataSource.getRepository(Exercise).find();
  if (existingExercises.length !== 0) return;

  const categoriesByName = (
    await dataSource.getRepository(Category).find()
  ).reduce(
    (categoriesByName, category) => ({
      ...categoriesByName,
      [category.name]: category,
    }),
    {},
  );
  for (const exercise of exercises) {
    const entity = new Exercise(
      exercise.id,
      exercise.name,
      exercise.difficulty,
      exercise.description,
      exercise.isTimeExercise,
      exercise.categories.map((name) => categoriesByName[name]),
    );
    await dataSource.manager.save(entity);
  }
};
