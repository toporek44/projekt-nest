import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistics } from './entities/statistics.entity';
import { ChartStatistics, GeneralStatistics } from './types';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private statisticsRepository: Repository<Statistics>,
  ) {}

  async getStatistics(): Promise<GeneralStatistics> {
    const totalRecords = await this.statisticsRepository.count();
    const averageResult = await this.statisticsRepository
      .createQueryBuilder()
      .select('AVG(value)', 'avgValue')
      .getRawOne();

    return {
      totalRecords,
      averageValue: parseFloat(averageResult.avgValue),
    };
  }

  async getChartStatistics(): Promise<ChartStatistics> {
    const chartData = await this.statisticsRepository
      .createQueryBuilder()
      .select("date_trunc('day', created_at)", 'date')
      .addSelect('SUM(value)', 'totalValue')
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    return chartData.map((data) => ({
      date: data.date,
      totalValue: parseFloat(data.totalValue),
    }));
  }
}
