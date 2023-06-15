import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { LessonsModule } from './lessons/lessons.module';

@Module({
  imports: [UsersModule, LessonsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
