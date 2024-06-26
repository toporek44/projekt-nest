import { Controller, Get, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { GeneralStatistics, ChartStatistics } from './types';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@UseGuards(AuthGuard)
@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getStatistics(): Promise<GeneralStatistics> {
    return this.statisticsService.getStatistics();
  }

  // @Get('chart')
  // async getChartStatistics(): Promise<ChartStatistics> {
  //   return this.statisticsService.getChartStatistics();
  // }
}
