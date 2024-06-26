import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Statistics {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  totalCount: number;

  @Column('decimal', { precision: 10, scale: 2 })
  averageValue: number;

  @Column({ type: 'timestamp' })
  created_at: Date;

  @Column('float')
  value: number;
}
