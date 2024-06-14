import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category, CreateCategoryDTO, UpdateCategoryDTO } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async create(createCategoryDto: CreateCategoryDTO): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);

    return this.categoryRepository.save(category);
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDTO): Promise<Category> {
    const category = await this.categoryRepository.preload({
      id: +id,
      ...updateCategoryDto,
    });
    if (!category) {
      throw new Error('Category not found.');
    }

    return this.categoryRepository.save(category);
  }

  async remove(id: string): Promise<void> {
    const result = await this.categoryRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Category not found.');
    }
  }
}
