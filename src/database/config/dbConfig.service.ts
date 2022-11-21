import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

dotenv.config();

class DbConfigService {
  private defaultConfig = {
    type: 'postgres',
    url: process.env.DATABASE_URL,
    autoLoadEntities: true,
    synchronize: false,
    ssl: this.getSSLConfig(),
    logging: true,
  } as const;

  // private isDevelopment() {
  //   return process.env.NODE_ENV === 'development';
  // }

  private getSSLConfig() {
    return false;
    // if (this.isDevelopment()) return false;

    // return { rejectUnauthorized: false };
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return this.defaultConfig;
  }

  getTypeOrmDataSourceConfig(): PostgresConnectionOptions {
    return {
      ...this.defaultConfig,
      migrationsTableName: 'migration',
      migrations: ['src/database/migrations/*.ts'],
      entities: ['src/database/entities/*.ts'],
    };
  }
}

export const dbConfigService = new DbConfigService();
