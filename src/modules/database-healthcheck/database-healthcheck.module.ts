import { Module } from '@nestjs/common';
import { DatabaseHealthCheckController } from './database-healthcheck.controller';
import { DatabaseHealthCheckService } from './database-healthcheck.service';

@Module({
  controllers: [DatabaseHealthCheckController],
  providers: [DatabaseHealthCheckService],
})
export class DatabaseHealthCheckModule {}
