import { Module } from '@nestjs/common';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { AuthService } from '../auth/auth.service';
import { FlashcardsModule } from '../flashcards/flashcards.module';
import { StatsModule } from '../stats/stats.module';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { CurrentUserInterceptor } from '../interceptors/current-user.interceptor';

@Module({
  imports: [TypeOrmModule.forFeature([User]), FlashcardsModule, StatsModule],
  controllers: [UsersController],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: CurrentUserInterceptor,
    },
    UsersService,
    AuthService,
    JwtService,
  ],
  exports: [UsersService],
})
export class UsersModule {}
