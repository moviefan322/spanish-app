import { Column, Entity, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';

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

  @OneToOne(() => User, (user) => user.stats)
  user: User;
}
