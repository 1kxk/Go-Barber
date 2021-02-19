import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import {
  NotificationSchema,
  Notification
} from './models/entities/notification'
import { NotificationsRepository } from './notifications.repository'
import { NotificationsService } from './notifications.service'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Notification.name,
        schema: NotificationSchema
      }
    ])
  ],
  providers: [NotificationsService, NotificationsRepository],
  exports: [NotificationsService]
})
export class NotificationsModule {}
