import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseTestController } from './database-test/database-test.controller';
import { DatabaseTestService } from './database-test/database-test.service';
import { AuthModule } from './modules/auth/auth.module';

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
    AuthModule,
  ],
  providers: [DatabaseTestService, AppService],
  controllers: [DatabaseTestController, AppController],
})
// @Module({
//   imports: [],
//   controllers: [AppController],
//   providers: [AppService],
// })
export class AppModule {}
