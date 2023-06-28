import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Stats {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  lessonId: number;

  @Column()
  score: number;

  @Column()
  userId: number;
}
