import { Type } from 'class-transformer';
import { IsEnum, IsInt, Max, Min } from 'class-validator';
import { SessionType } from './sessionType';

export class GetSessionPropositionDTO {
  @IsEnum(SessionType)
  sessionType: string;

  @IsInt()
  @Type(() => Number)
  @Min(0)
  intensity: number;

  @IsInt()
  @Type(() => Number)
  @Min(1)
  @Max(5)
  exerciseDifficulty: number;
}
