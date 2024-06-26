import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { CreateReminderDTO, UpdateReminderDTO } from './entities/reminder.entity';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Reminders')
@Controller('reminders')
@UseGuards(AuthGuard)
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get()
  async findAll() {
    return this.reminderService.findAll();
  }

  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateReminderDTO })
  @Post()
  async create(@Body() createReminderDto: CreateReminderDTO) {
    return this.reminderService.create(createReminderDto);
  }
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdateReminderDTO })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDTO) {
    return this.reminderService.update(id, updateReminderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.reminderService.remove(id);
  }
}
