import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseTestController } from './database-test/database-test.controller';
import { DatabaseTestService } from './database-test/database-test.service';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

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
    AuthModule,
    UsersModule,
  ],
  providers: [DatabaseTestService, AppService],
  controllers: [DatabaseTestController, AppController],
})
export class AppModule {}
