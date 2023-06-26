import { IsNumber, IsString } from 'class-validator';

export class CreateFlashcardDto {
  @IsString()
  spanish: string;

  @IsString()
  english: string;

  @IsNumber()
  userId: string;
}
