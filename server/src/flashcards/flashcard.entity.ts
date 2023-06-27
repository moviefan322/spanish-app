import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Flashcard {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  spanish: string;

  @Column()
  english: string;

  @Column()
  userId: number;
}
