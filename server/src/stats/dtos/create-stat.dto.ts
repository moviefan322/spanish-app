import { IsNumber } from 'class-validator';

export class CreateStatDto {
  @IsNumber()
  lessonId: number;

  @IsNumber()
  score: number;

  @IsNumber()
  userId: number;
}
