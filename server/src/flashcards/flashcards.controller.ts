import { Controller, Body, Post, UseGuards, Get, Param } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dtos/create-flashcard.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get(':userId')
  async findFlashcards(@Param('userId') userId: number) {
    return this.flashcardsService.findFlashcards(userId);
  }

  @Post()
  @Serialize(CreateFlashcardDto)
  async create(@Body() body: CreateFlashcardDto) {
    const flashcard = await this.flashcardsService.addFlashcard(body);
    return flashcard;
  }
}
