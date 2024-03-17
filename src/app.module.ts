import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExampleController } from './controllers/example/example.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseTestService } from './database-test/database-test.service';
import { DatabaseTestController } from './database-test/database-test.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // Note: set this to false in production
      }),
    }),
  ],
  providers: [DatabaseTestService],
  controllers: [DatabaseTestController],
})
@Module({
  imports: [],
  controllers: [AppController, ExampleController],
  providers: [AppService],
})
export class AppModule {}
