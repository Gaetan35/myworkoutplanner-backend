import { AppDataSource } from '../../src/database/config/data-source';
import { createExercises, ExerciseToCreate } from './seedExercises';
import { createCategories } from './seedCategories';
import * as csv from 'csv-parser';
import * as fs from 'fs';

const getSeedingData = (): Promise<{
  categories: string[];
  exercises: ExerciseToCreate[];
}> => {
  return new Promise((resolve) => {
    const categories: string[] = [];
    const exercises: ExerciseToCreate[] = [];
    fs.createReadStream(`${__dirname}/data/data.csv`)
      .pipe(csv())
      .on('data', (row) => {
        exercises.push({
          name: row['Name'],
          difficulty: parseInt(row['Difficulty']),
          categories: row['Category'].split(' + '),
          isTimeExercise: row['IsTimeExercise'] === 'TRUE',
          description: row['Description'],
          imageName: row['ImageName'],
        });
        categories.push(...row['Category'].split(' + '));
      })
      .on('end', () => {
        resolve({ categories: [...new Set(categories)], exercises });
      });
  });
};

const seed = async () => {
  console.log('Starting database seeding...');
  const { categories, exercises } = await getSeedingData();
  await AppDataSource.initialize();
  await createCategories(AppDataSource, categories);
  await createExercises(AppDataSource, exercises);
  console.log('Seeding is done');
};

seed();
