import { IsNotEmpty, IsNumber, IsString, IsDate, IsOptional } from 'class-validator';
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
  date: Date;

  @Column()
  userId: number;
}

export class CreateFinanceDTO {
  @IsNotEmpty()
  @IsNumber()
  amount: number;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  date: Date;

  @IsOptional()
  @IsString()
  categoryId?: string; // Optional category ID if finance records are categorized
}

export class UpdateFinanceDTO {
  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDate()
  date?: Date;

  @IsOptional()
  @IsString()
  categoryId?: string;
}
