import { IsBoolean, IsInt, IsString, Max, Min } from 'class-validator';

export class CreateExerciseDTO {
  @IsString()
  name: string;

  @IsInt()
  @Min(1)
  @Max(5)
  difficulty: number;

  @IsString()
  description: string;

  @IsBoolean()
  isTimeExercise: boolean;
}
