import { AppDataSource } from '../../src/database/config/data-source';
import { createExercises } from './seedDatabase';
import { createCategories } from './seedCategories';

const seed = async () => {
  console.log('Starting database seeding...');
  await AppDataSource.initialize();
  await createCategories(AppDataSource);
  await createExercises(AppDataSource);
  console.log('Seeding is done');
};

seed();
