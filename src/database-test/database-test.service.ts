import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';

@Injectable()
export class DatabaseTestService {
  constructor(@InjectEntityManager() private readonly entityManager: EntityManager) {}

  async testConnection(): Promise<string> {
    try {
      const result = await this.entityManager.query('SELECT NOW()');
      console.log('Database connection test successful:', result);
      return 'Database connection test successful. Current time: ' + result[0].now;
    } catch (error) {
      console.error('Database connection test failed:', error);
      throw new Error('Database connection test failed');
    }
  }
}
