import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { FinanceService } from './finance.service';

@Controller('finances')
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  async findAll() {
    // Retrieve all finance records
  }

  @Post()
  async create(@Body() createFinanceDto: any) {
    // Create a new finance record
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFinanceDto: any) {
    // Update an existing finance record
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Delete a finance record
  }
}
