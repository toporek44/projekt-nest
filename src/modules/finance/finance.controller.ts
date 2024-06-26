import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Session,
} from '@nestjs/common';
import { FinanceService } from './finance.service';
import { CreateFinanceDTO, UpdateFinanceDTO } from './entities/finance.entity';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Finances')
@Controller('finances')
@UseGuards(AuthGuard)
export class FinanceController {
  constructor(private readonly financeService: FinanceService) {}

  @Get()
  async findAll() {
    return this.financeService.findAll();
  }

  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateFinanceDTO })
  @Post()
  async create(@Body() createFinanceDto: CreateFinanceDTO, @Session() session: any) {
    return this.financeService.create({ ...createFinanceDto, userId: session.userId });
  }
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdateFinanceDTO })
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
