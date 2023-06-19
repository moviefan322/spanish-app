import {
  AfterInsert,
  AfterUpdate,
  AfterRemove,
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
} from 'typeorm';
import { Stats } from '../stats/stats.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  username: string;

  @OneToOne(() => Stats, (stats) => stats.user)
  stats: Stats;

  @AfterInsert()
  logInsert() {
    console.log('Inserted User with id', this.id);
  }

  @AfterUpdate()
  logUpdate() {
    console.log('Updated User with id', this.id);
  }

  @AfterRemove()
  logRemove() {
    console.log('Removed User with id', this.id);
  }
}
