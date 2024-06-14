import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { NotificationService } from './notification.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { CreateNotificationDTO } from './notification.entity';

@WebSocketGateway({
  cors: {
    origin: '*',
    credentials: true,
  },
})
@UseGuards(AuthGuard)
export class NotificationsGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private notificationService: NotificationService) {}

  async handleConnection(client: Socket) {
    const user = client.data.user;
    await this.notificationService.registerConnection(user.id, client.id);
  }

  async handleDisconnect(client: Socket) {
    const user = client.data.user;
    await this.notificationService.unregisterConnection(user.id, client.id);
  }

  @SubscribeMessage('notify')
  async handleNotification(@MessageBody() data: CreateNotificationDTO, @ConnectedSocket() client: Socket) {
    const user = client.data.user;
    await this.notificationService.processNotification(data, user);

    // Send notification to other connected clients
    this.broadcastNotification(user.id, data.message);
  }

  broadcastNotification(senderId: string, message: string) {
    this.server.sockets.sockets.forEach((socket) => {
      if (socket.data.user.id !== senderId) {
        socket.emit('notification', { message });
      }
    });
  }

  sendNotificationToUser(userId: string, message: string) {
    this.server.sockets.sockets.forEach((socket) => {
      if (socket.data.user.id === userId) {
        socket.emit('notification', { message });
      }
    });
  }
}
