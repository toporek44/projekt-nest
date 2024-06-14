import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { Notification } from './notification.entity';
import { AuthGuard } from 'src/guards/auth.guard';

@ApiTags('notifications')
@ApiBearerAuth()
@Controller('notifications')
@UseGuards(AuthGuard)
export class NotificationController {
  constructor(private readonly notificationService: NotificationService) {}

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get all notifications for a user' })
  @ApiResponse({ status: 200, description: 'List of notifications', type: [Notification] })
  async getNotificationsForUser(@Param('userId') userId: string): Promise<Notification[]> {
    return this.notificationService.getNotificationsForUser(userId);
  }
}
