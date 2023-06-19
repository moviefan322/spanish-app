import { Expose, Transform } from 'class-transformer';

export class StatsDto {
  @Expose()
  @Transform(({ value }) => value.id)
  id: number;

  @Expose()
  @Transform(({ value }) => value.lessonId)
  lessonId: number;

  @Expose()
  @Transform(({ value }) => value.isCompleted)
  isCompleted: boolean;

  @Expose()
  @Transform(({ value }) => value.score)
  score: number;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
