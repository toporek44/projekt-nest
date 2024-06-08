import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { FinanceModule } from './modules/finance/finance.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { CategoryModule } from './modules/category/category.module';
import { ReminderModule } from './modules/reminder/reminder.module';
import { DatabaseHealthCheckModule } from './modules/database-healthcheck/database-healthcheck.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        url: config.get('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true, // Note: set this to false in production
      }),
    }),
    DatabaseHealthCheckModule,
    UsersModule,
    FinanceModule,
    StatisticsModule,
    CategoryModule,
    ReminderModule,
  ],
  providers: [AppService],
  controllers: [AppController],
})
export class AppModule {}
