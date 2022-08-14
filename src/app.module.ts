import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExerciseModule } from './exercise/exercise.module';
import { CommonModule } from './common/common.module';
import { SessionModule } from './session/session.module';

@Module({
  imports: [ExerciseModule, CommonModule, SessionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
