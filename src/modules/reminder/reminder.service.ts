import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateReminderDTO, Reminder, UpdateReminderDTO } from './entities/reminder.entity';

@Injectable()
export class ReminderService {
  constructor(
    @InjectRepository(Reminder)
    private reminderRepository: Repository<Reminder>,
  ) {}

  async findAll(): Promise<Reminder[]> {
    return this.reminderRepository.find();
  }

  async create(createReminderDto: CreateReminderDTO): Promise<Reminder> {
    const reminder = this.reminderRepository.create(createReminderDto);

    return this.reminderRepository.save(reminder);
  }

  async update(id: string, updateReminderDto: UpdateReminderDTO): Promise<Reminder> {
    const reminder = await this.reminderRepository.preload({
      id: +id, // Convert string ID to numeric if your ID is a number
      ...updateReminderDto,
    });
    if (!reminder) {
      throw new Error('Reminder not found.');
    }

    return this.reminderRepository.save(reminder);
  }

  async remove(id: string): Promise<void> {
    const result = await this.reminderRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Reminder not found.');
    }
  }
}
