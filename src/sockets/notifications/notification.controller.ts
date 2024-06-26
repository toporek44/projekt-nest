import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiConsumes, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NotificationService } from './notification.service';
import { CreateNotificationDTO, Notification } from './notification.entity';
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

  @Post('user/:userId')
  @ApiOperation({ summary: 'Submit form data' })
  @ApiConsumes('application/x-www-form-urlencoded')
  @ApiResponse({ status: 200 })
  async sendNotificationToUser(
    @Param('userId') userId: string,
    @Body() createNotificationDto: CreateNotificationDTO,
  ): Promise<void | null> {
    return this.notificationService.processNotification(createNotificationDto, userId);
  }
}
