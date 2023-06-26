import { IsString } from 'class-validator';

export class CreateFlashcardDto {
  @IsString()
  spanish: string;

  @IsString()
  english: string;
}
