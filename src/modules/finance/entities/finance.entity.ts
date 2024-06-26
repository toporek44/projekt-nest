import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Finance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  amount: number;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column()
  userId: string;
}

export class CreateFinanceDTO {
  @ApiProperty({ example: 2.21 })
  @IsNotEmpty()
  @IsNumber()
  @Type(() => Number)
  amount: number;

  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '1719432214' })
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsOptional()
  @IsString()
  categoryId?: string; // Optional category ID if finance records are categorized

  @IsOptional()
  @IsString()
  userId?: string; // Optional category ID if finance records are categorized

  @IsOptional()
  createdAt: Date;
}

export class UpdateFinanceDTO {
  @ApiProperty({ example: 2.21 })
  @IsOptional()
  @IsNumber()
  @Type(() => Number)
  amount?: number;

  @ApiProperty({ example: 'test' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '1719432214' })
  @IsOptional()
  @IsString()
  date?: string;

  @IsOptional()
  @IsString()
  categoryId?: string;

  @IsOptional()
  @IsString()
  userId?: string; // Optional category ID if finance records are categorized
}
