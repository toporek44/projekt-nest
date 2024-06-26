import { Module } from '@nestjs/common';
import { StatisticsController } from './statistics.controller';
import { StatisticsService } from './statistics.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Statistics } from './entities/statistics.entity';
import { Finance } from '../finance/entities/finance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Statistics, Finance])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
