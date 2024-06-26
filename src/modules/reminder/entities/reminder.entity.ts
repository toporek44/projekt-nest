import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsOptional } from 'class-validator';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Reminder {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  @Column({ type: 'timestamp' })
  updatedAt: Date;

  @Column({ type: 'timestamp' })
  reminderDate: string;
}

export class CreateReminderDTO {
  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({ example: 'test' })
  @IsNotEmpty()
  @IsString()
  description: string;

  @ApiProperty({ example: '1719432204' })
  @IsNotEmpty()
  @IsString()
  reminderDate: string;
}

export class UpdateReminderDTO {
  @ApiProperty({ example: 'test' })
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty({ example: 'test' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ example: '1719432204' })
  @IsOptional()
  @IsString()
  reminderDate?: string;
}
