import { Controller, Get } from '@nestjs/common';
import { StatisticsService } from './statistics.service';

@Controller('statistics')
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  @Get()
  async getStatistics() {
    // Retrieve general statistics
  }

  @Get('chart')
  async getChartStatistics() {
    // Retrieve statistics for charting
  }
}
