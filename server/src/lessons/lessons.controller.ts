import { Controller, Get, Param } from '@nestjs/common';
import { LessonsService } from './lessons.service';

@Controller('lessons')
export class LessonsController {
  constructor(private lessonsService: LessonsService) {}
  @Get()
  getLessons() {
    return this.lessonsService.getAllLLessons();
  }

  @Get('/:lessonId')
  getLesson(@Param('lessonId') lessonId: string) {
    return this.lessonsService.getLesson(lessonId);
  }
}
