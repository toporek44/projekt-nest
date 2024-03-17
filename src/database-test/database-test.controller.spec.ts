import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseTestController } from './database-test.controller';

describe('DatabaseTestController', () => {
  let controller: DatabaseTestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DatabaseTestController],
    }).compile();

    controller = module.get<DatabaseTestController>(DatabaseTestController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
