import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, HttpStatus, UseGuards } from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDTO, UpdateFinanceDTO } from './entities/finance.entity';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Finances')
@Controller('finances')
@UseGuards(AuthGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  async findAll() {
    return this.financeService.findAll();
  }

  @Post()
  async create(@Body() createFinanceDto: CreateFinanceDTO) {
    return this.financeService.create(createFinanceDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateFinanceDto: UpdateFinanceDTO) {
    return this.financeService.update(id, updateFinanceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string) {
    await this.financeService.remove(id);
  }
}
