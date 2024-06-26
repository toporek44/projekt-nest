import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateFinanceDTO, Finance, UpdateFinanceDTO } from './entities/finance.entity';

@Injectable()
export class FinanceService {
  constructor(
    @InjectRepository(Finance)
    private financeRepository: Repository<Finance>,
  ) {}

  async findAll(): Promise<Finance[]> {
    return this.financeRepository.find();
  }

  async create(createFinanceDto: CreateFinanceDTO): Promise<Finance> {
    const createdAt = new Date();
    const finance = this.financeRepository.create({ ...createFinanceDto, createdAt });

    return this.financeRepository.save(finance);
  }

  async update(id: string, updateFinanceDto: UpdateFinanceDTO): Promise<Finance> {
    const finance = await this.financeRepository.preload({
      id: +id, // ensure this is a number if your ID is numerical
      ...updateFinanceDto,
    });
    if (!finance) {
      throw new Error('Finance record not found.');
    }

    return this.financeRepository.save(finance);
  }

  async remove(id: string): Promise<void> {
    const result = await this.financeRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Finance record not found.');
    }
  }
}
