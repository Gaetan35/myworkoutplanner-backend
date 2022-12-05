import { Test, TestingModule } from '@nestjs/testing';
import { Exercise } from '../database/entities';
import { ExerciseRepository } from '../database/repositories/exercise.repository';
import { SessionService } from './session.service';

describe('SessionService', () => {
  let service: SessionService;

  const exercise = new Exercise(
    'exerciseId',
    'name',
    3,
    'exerciseDescription',
    false,
    [],
  );

  const mockExerciseRepository = {
    findAll: jest.fn(() => Promise.resolve([exercise])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SessionService,
        { provide: ExerciseRepository, useValue: mockExerciseRepository },
      ],
    }).compile();

    service = module.get<SessionService>(SessionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
