import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Statistics } from './entities/statistics.entity';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(Statistics)
    private statisticsRepository: Repository<Statistics>,
  ) {}

  async getStatistics(): Promise<any> {
    // Logic to get general statistics
    return {};
  }

  async getChartStatistics(): Promise<any> {
    // Logic to get chart statistics
    return {};
  }
}
