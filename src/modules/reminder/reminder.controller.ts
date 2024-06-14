import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ReminderService } from './reminder.service';
import { CreateReminderDTO, UpdateReminderDTO } from './entities/reminder.entity';

@Controller('reminders')
export class ReminderController {
  constructor(private readonly reminderService: ReminderService) {}

  @Get()
  async findAll() {
    return this.reminderService.findAll();
  }

  @Post()
  async create(@Body() createReminderDto: CreateReminderDTO) {
    return this.reminderService.create(createReminderDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateReminderDto: UpdateReminderDTO) {
    return this.reminderService.update(id, updateReminderDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.reminderService.remove(id);
  }
}
