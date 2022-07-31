import { DataSource } from 'typeorm';

import { dbConfigService } from './dbConfig.service';

export const AppDataSource = new DataSource(
  dbConfigService.getTypeOrmDataSourceConfig(),
);
