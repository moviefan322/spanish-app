import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Stats } from './stats.entity';
import { CreateStatDto } from './dtos/create-stat.dto';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Stats)
    private repo: Repository<Stats>,
  ) {}

  async create(statDto: CreateStatDto) {
    console.log(statDto);
    const stat = this.repo.create(statDto);
    return this.repo.save(stat);
  }

  async findStats(userId: number) {
    return this.repo.find({ where: { userId } });
  }

  async update(id: number, statDto: CreateStatDto) {
    const stat = await this.repo.findOne({ where: { id } });
    this.repo.merge(stat, statDto);
    return this.repo.save(stat);
  }
}
