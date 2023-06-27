import { IsString, IsNumber } from 'class-validator';

export class CreateFlashcardDto {
  @IsString()
  spanish: string;

  @IsString()
  english: string;

  @IsNumber()
  userId: number;
}
