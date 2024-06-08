import { Controller, Get } from '@nestjs/common';
import { DatabaseHealthCheckService } from './database-healthcheck.service';

@Controller('database')
export class DatabaseHealthCheckController {
  constructor(private readonly databaseTestService: DatabaseHealthCheckService) {}

  @Get('health-check')
  async testConnection() {
    return this.databaseTestService.testConnection();
  }
}
