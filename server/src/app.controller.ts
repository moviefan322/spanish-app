import { Controller, Request, Post, UseGuards, Get } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth/auth.service';
import { FlashcardsService } from './flashcards/flashcards.service';
import { StatsService } from './stats/stats.service';
import { JwtAuthGuard } from './auth/jwt-auth.guard';

@Controller()
export class AppController {
  constructor(
    private authService: AuthService,
    private statsService: StatsService,
    private flashcardsService: FlashcardsService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    const stats = await this.statsService.findStats(req.user.id);
    const flashcards = await this.flashcardsService.findFlashcards(req.user.id);
    return { user: req.user, stats, flashcards };
  }
}
