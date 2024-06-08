import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    // Retrieve all categories
  }

  @Post()
  async create(@Body() createCategoryDto: any) {
    // Create a new category
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: any) {
    // Update an existing category
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    // Delete a category
  }
}
