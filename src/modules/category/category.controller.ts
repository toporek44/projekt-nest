import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './entities/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDTO) {
    return this.categoryService.create(createCategoryDto);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDTO) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
  }
}
