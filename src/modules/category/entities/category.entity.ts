import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;
}

export class CreateCategoryDTO {
  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: 'test' })
  @IsOptional()
  @IsString()
  description?: string;
}

export class UpdateCategoryDTO {
  @ApiProperty({ example: 'test' })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({ example: 'test' })
  @IsOptional()
  @IsString()
  description?: string;
}
