import { Controller, Body, Post, UseGuards } from '@nestjs/common';
import { FlashcardsService } from './flashcards.service';
import { CreateFlashcardDto } from './dtos/create-flashcard.dto';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { User } from 'src/users/user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { Serialize } from '../interceptors/serialize.interceptor';

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Post()
  @UseGuards(AuthGuard)
  @Serialize(CreateFlashcardDto)
  async create(@Body() body: CreateFlashcardDto, @CurrentUser() user: User) {
    return this.flashcardsService.addFlashcard(body, user);
  }
}
