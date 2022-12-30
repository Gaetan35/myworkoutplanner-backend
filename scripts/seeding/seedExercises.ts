import * as uuid from 'uuid';
import { Exercise } from '../../src/database/entities';
import { DataSource } from 'typeorm';
import { Category } from '../../src/database/entities/categories.entity';
import { uploadImages } from './cloudinaryUpload';

export type ExerciseToCreate = {
  name: string;
  difficulty: number;
  categories: string[];
  isTimeExercise: boolean;
  description: string;
  imageName: string;
};

export const createExercises = async (
  dataSource: DataSource,
  exercises: ExerciseToCreate[],
) => {
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

  const imageUrlByFilename = await uploadImages(
    exercises.map((exercise) => exercise.imageName).filter(Boolean),
  );

  for (const exercise of exercises) {
    const entity = new Exercise(
      uuid.v4(),
      exercise.name,
      exercise.difficulty,
      exercise.description,
      exercise.isTimeExercise,
      exercise.categories.map((name) => categoriesByName[name]),
      imageUrlByFilename[exercise.imageName],
    );
    await dataSource.manager.save(entity);
  }
};
