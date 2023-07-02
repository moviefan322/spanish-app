import {
  Controller,
  Request,
  Post,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { FlashcardsService } from './flashcards/flashcards.service';
import { StatsService } from './stats/stats.service';
import { UsersService } from './users/users.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private statsService: StatsService,
    private flashcardsService: FlashcardsService,
    private usersService: UsersService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    console.log(req);
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const stats = await this.statsService.findStats(req.user.id);
    const flashcards = await this.flashcardsService.findFlashcards(req.user.id);
    return { user: req.user, stats, flashcards };
  }

  @Get(':id')
  async getUserData(@Request() req, @Param('id') id: number) {
    const user = await this.usersService.findOne(id);
    const stats = await this.statsService.findStats(id);
    const flashcards = await this.flashcardsService.findFlashcards(id);
    return { user, stats, flashcards };
  }
}
