import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Expose()
  userId: string;

  @Column({ length: 500 })
  @IsNotEmpty()
  @Expose()
  username: string;

  @Column('text')
  @IsEmail()
  @Expose()
  email: string;

  @Column('text')
  @IsNotEmpty()
  @Exclude()
  password: string;
}

export class UserLoginDto {
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'password123' })
  password: string;
}

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'username' })
  username: string;

  @IsString()
  @ApiProperty({ example: 'password123' })
  password: string;

  @IsNotEmpty()
  @IsEmail()
  @ApiProperty({ example: 'user@example.com' })
  email: string;
}
