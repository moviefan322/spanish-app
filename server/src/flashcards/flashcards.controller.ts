import { Controller, Body, Post, Get, Param } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dtos/create-flashcard.dto';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get(':userId')
  async findFlashcards(@Param('userId') userId: number) {
    return this.flashcardsService.findFlashcards(userId);
  }

  @Post()
  async create(@Body() body: CreateFlashcardDto) {
    const flashcard = await this.flashcardsService.create(body);
    return flashcard;
  }
}
