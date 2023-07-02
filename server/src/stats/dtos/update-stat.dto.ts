import { IsNumber, Min, Max } from 'class-validator';

export class UpdateStatDto {
  @IsNumber()
  id: number;

  @IsNumber()
  @Min(0)
  @Max(999999)
  lessonId: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  score: number;

  @IsNumber()
  @Min(0)
  @Max(100)
  outOf: number;

  @IsNumber()
  @Min(0)
  @Max(999999)
  userId: number;
}
