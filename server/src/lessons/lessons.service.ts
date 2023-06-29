import { Injectable } from '@nestjs/common';
import { readFile } from 'fs';
import { join } from 'path';

const filePath = join(__dirname, '..', '..', 'lessonData', 'unit1.json');

const getLessons = async () => {
  const unit1 = await new Promise((resolve, reject) => {
    readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error(err);
        reject(err);
        return;
      }
      resolve(data);
    });
  });

  const allLessons = [unit1];
  return allLessons;
};

@Injectable()
export class LessonsService {
  async getAllLLessons() {
    const allLessons = await getLessons();
    return JSON.stringify(allLessons);
  }

  async getLesson(lessonId: string) {
    const allLessons = await getLessons();
    return JSON.stringify(allLessons[+lessonId - 1]);
  }
}
