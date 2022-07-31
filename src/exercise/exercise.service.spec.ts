import { Test, TestingModule } from '@nestjs/testing';
import { Exercise } from '../database/entities';
import { ExerciseRepository } from '../database/repositories/exercise.repository';
import { ExerciseService } from './exercise.service';

describe('ExerciseService', () => {
  let service: ExerciseService;

  const exercise = new Exercise('exerciseId', 'name', 3, 'exerciseDescription');

  const mockExerciseRepository = {
    findAll: jest.fn(() => Promise.resolve([exercise])),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        { provide: ExerciseRepository, useValue: mockExerciseRepository },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllExercises', () => {
    let result: Exercise[];

    beforeAll(async () => {
      result = await service.getExercises();
    });

    it('should call productsRepository findAll method', () => {
      expect(mockExerciseRepository.findAll).toHaveBeenCalledTimes(1);
    });

    it('should return correct result', () => {
      expect(result).toEqual([exercise]);
    });
  });
});
