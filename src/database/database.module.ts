import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbConfigService } from './config/dbConfig.service';
import { Exercise } from './entities';
import { Category } from './entities/categories.entity';
import { ExerciseRepository } from './repositories/exercise.repository';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot(dbConfigService.getTypeOrmConfig()),
    TypeOrmModule.forFeature([Exercise]),
    // TODO: add category in same list as exercise
    TypeOrmModule.forFeature([Category]),
  ],
  providers: [ExerciseRepository],
  exports: [TypeOrmModule, ExerciseRepository],
})
export class DatabaseModule {}
