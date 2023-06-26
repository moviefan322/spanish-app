import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Flashcard } from './flashcard.entity';
import { User } from '../users/user.entity';
import { CreateFlashcardDto } from './dtos/create-flashcard.dto';

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectRepository(Flashcard)
    private repo: Repository<Flashcard>,
  ) {}

  async addFlashcard(flashcardDto: CreateFlashcardDto, user: User) {
    const flashcard = this.repo.create(flashcardDto);
    flashcard.user = user;

    return this.repo.save(flashcard);
  }
}
