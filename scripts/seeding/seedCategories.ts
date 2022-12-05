import * as uuid from 'uuid';
import { DataSource } from 'typeorm';
import { Category } from '../../src/database/entities/categories.entity';

const categories = ['Abs', 'Epaule', 'Pec', 'Jambe', 'Cardio'];

export const createCategories = async (dataSource: DataSource) => {
  const existingCategories = await dataSource.getRepository(Category).find();
  if (existingCategories.length !== 0) return;

  for (const muscle of categories) {
    const entity = new Category(uuid.v4(), muscle);
    await dataSource.manager.save(entity);
  }
};
