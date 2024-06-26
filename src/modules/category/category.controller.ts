import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDTO, UpdateCategoryDTO } from './entities/category.entity';
import { ApiBody, ApiConsumes, ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('Categories')
@Controller('categories')
@UseGuards(AuthGuard)
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Get()
  async findAll() {
    return this.categoryService.findAll();
  }

  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: CreateCategoryDTO })
  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDTO) {
    return this.categoryService.create(createCategoryDto);
  }

  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiBody({ type: UpdateCategoryDTO })
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDTO) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.categoryService.remove(id);
  }
}
