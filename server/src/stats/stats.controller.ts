import { Controller, Body, Post, Get, Param, Put } from '@nestjs/common';
import { StatsService } from './stats.service';
import { CreateStatDto } from './dtos/create-stat.dto';

@Controller('stats')
export class StatsController {
  constructor(private readonly statsService: StatsService) {}

  @Get(':userId')
  async findStats(@Param('userId') userId: number) {
    return this.statsService.findStats(userId);
  }

  @Post()
  async create(@Body() body: CreateStatDto) {
    console.log('recieved paylod', body);
    const stats = await this.statsService.create(body);
    console.log(stats);
    return stats;
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() body: CreateStatDto) {
    const stats = await this.statsService.update(id, body);
    return stats;
  }
}
