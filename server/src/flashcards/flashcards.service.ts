import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flashcard } from './flashcard.entity';
import { CreateFlashcardDto } from './dtos/create-flashcard.dto';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectRepository(Flashcard)
    private repo: Repository<Flashcard>,
  ) {}

  async addFlashcard(flashcardDto: CreateFlashcardDto) {
    const flashcard = await this.repo.create(flashcardDto);
    console.log(flashcard);

    return JSON.stringify(flashcard);
  }

  async findFlashcards(userId: number) {
    return this.repo.find({ where: { userId } });
  }
}
