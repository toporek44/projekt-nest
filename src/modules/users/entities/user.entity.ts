import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: number;

  @Column({ length: 500 })
  username: string;

  @Column('text')
  email: string;

  @Column('text')
  password: string;
}
