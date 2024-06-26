import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChartStatistics, GeneralStatistics } from './types';
import { Finance } from '../finance/entities/finance.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Finance)
    private financeRepository: Repository<Finance>,
  ) {}

  async getStatistics(): Promise<GeneralStatistics> {
    const totalRecords = await this.financeRepository.count();
    const averageResult = await this.financeRepository
      .createQueryBuilder()
      .select('AVG(amount)', 'avgValue')
      .getRawOne();

    console.log(averageResult);

    return {
      totalRecords,
      averageValue: parseFloat(averageResult.avgValue),
    };
  }

  async getChartStatistics(): Promise<ChartStatistics> {
    const chartData = await this.financeRepository
      .createQueryBuilder()
      .select("DATE_TRUNC('day', createdAt)", 'date')
      .addSelect('SUM(amount)', 'totalAmount')
      .groupBy('date')
      .orderBy('date')
      .getRawMany();

    return chartData.map((data) => ({
      date: data.date as string,
      totalAmount: parseFloat(data.totalAmount),
    }));
  }
}
