import { Test, TestingModule } from '@nestjs/testing';
import { IdGeneratorService } from '../common/id-generator.service';
import { Exercise } from '../database/entities';
import { ExerciseRepository } from '../database/repositories/exercise.repository';
import { CreateExerciseDTO } from './dto/create-exercise.dto';
import { ExerciseService } from './exercise.service';

describe('ExerciseService', () => {
  let service: ExerciseService;

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
    save: jest.fn((exercise) => Promise.resolve(exercise)),
  };

  const exerciseId = 'exerciseId';
  const mockIdGeneratorService = {
    new: jest.fn(() => exerciseId),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExerciseService,
        { provide: ExerciseRepository, useValue: mockExerciseRepository },
        { provide: IdGeneratorService, useValue: mockIdGeneratorService },
      ],
    }).compile();

    service = module.get<ExerciseService>(ExerciseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getExercises', () => {
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

  describe('createExercise', () => {
    let result: Exercise;
    const dto: CreateExerciseDTO = {
      name: 'exerciseName',
      difficulty: 4,
      description: 'exerciseDescription',
      isTimeExercise: false,
    };
    const expectedExercise = Exercise.fromDto(exerciseId, dto);

    beforeAll(async () => {
      result = await service.createExercise(dto);
    });

    it('should call idGeneratorService new method ', () => {
      expect(mockIdGeneratorService.new).toHaveBeenCalledTimes(1);
    });

    it('should call productsRepository save method with correct params', () => {
      expect(mockExerciseRepository.save).toHaveBeenCalledWith(
        expectedExercise,
      );
    });

    it('should return correct result', () => {
      expect(result).toEqual(expectedExercise);
    });
  });
});
