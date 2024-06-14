import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationService } from './notification.service';
import { NotificationsGateway } from './notifications.gateway';
import { Notification } from './notification.entity';
import { NotificationController } from './notification.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notification])],
  providers: [NotificationService, NotificationsGateway],
  controllers: [NotificationController], // Add the controller here
  exports: [NotificationService],
})
export class NotificationModule {}
