import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lessonId: number;

  @Column()
  isCompleted: boolean;

  @Column()
  score: number;

  @Column()
  userId: number;
}
