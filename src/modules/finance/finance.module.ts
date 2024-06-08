import { Module } from '@nestjs/common';
import { FinanceController } from './finance.controller';
import { FinanceService } from './finance.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Finance } from './entities/finance.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Finance])],
  controllers: [FinanceController],
  providers: [FinanceService],
})
export class FinanceModule {}
