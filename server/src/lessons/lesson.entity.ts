import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Lesson {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  unit: number;

  @Column()
  title: string;

  @Column()
  description: string;
}
