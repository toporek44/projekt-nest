import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { GeneralStatistics, ChartStatistics } from './types';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getStatistics(): Promise<GeneralStatistics> {
    return this.statisticsService.getStatistics();
  }

  @Get('chart')
  async getChartStatistics(): Promise<ChartStatistics> {
    return this.statisticsService.getChartStatistics();
  }
}
