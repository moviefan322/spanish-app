import { Controller, Body, Post, Get, Param, Put } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dtos/create-stat.dto';
import { UpdateStatDto } from './dtos/update-stat.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get(':userId')
  async findStats(@Param('userId') userId: number) {
    return this.statsService.findStats(userId);
  }

  @Post()
  async create(@Body() body: CreateStatDto) {
    console.log(body);
    const stats = await this.statsService.create(body);
    return stats;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: UpdateStatDto) {
    const stats = await this.statsService.update(id, body);
    return stats;
  }
}
