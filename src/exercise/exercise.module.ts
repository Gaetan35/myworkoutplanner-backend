import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { CommonModule } from '../common/common.module';
import { ExerciseController } from './exercise.controller';
import { ExerciseService } from './exercise.service';

@Module({
  imports: [DatabaseModule, CommonModule],
  controllers: [ExerciseController],
  providers: [ExerciseService],
})
export class ExerciseModule {}
