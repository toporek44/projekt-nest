import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from 'socket.io';
import { CreateNotificationDTO, Notification } from './notification.entity';
import { User } from 'src/modules/users/entities/user.entity';

@Injectable()
export class NotificationService {
  private server: Server;
  private activeConnections: Map<string, Set<string>> = new Map(); // userId -> Set of socketIds

  constructor(
    @InjectRepository(Notification)
    private notificationRepository: Repository<Notification>,
  ) {}

  setServer(server: Server) {
    this.server = server;
  }

  async registerConnection(userId: string, socketId: string) {
    if (!this.activeConnections.has(userId)) {
      this.activeConnections.set(userId, new Set());
    }
    const userSockets = this.activeConnections.get(userId);
    if (userSockets) {
      userSockets.add(socketId);
    }
  }

  async unregisterConnection(userId: string, socketId: string) {
    const userSockets = this.activeConnections.get(userId);
    if (userSockets) {
      userSockets.delete(socketId);
      if (userSockets.size === 0) {
        this.activeConnections.delete(userId);
      }
    }
  }

  async getNotificationsForUser(userId: string): Promise<Notification[]> {
    return this.notificationRepository.find({ where: { userId }, order: { createdAt: 'DESC' } });
  }

  async processNotification(data: CreateNotificationDTO, user: User) {
    const notification = this.notificationRepository.create({
      userId: user.userId,
      content: data.message,
    });
    await this.notificationRepository.save(notification);
  }

  async sendNotificationToUser(userId: string, message: string) {
    const userSockets = this.activeConnections.get(userId);
    if (userSockets) {
      userSockets.forEach((socketId) => {
        const socket = this.server.sockets.sockets.get(socketId);
        if (socket) {
          socket.emit('notification', { message });
        }
      });
    }
  }
}
