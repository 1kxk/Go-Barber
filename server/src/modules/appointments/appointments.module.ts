import { CacheModule, Module } from '@nestjs/common'
import redisStore from 'cache-manager-redis-store'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { NotificationsModule } from '../notifications/notifications.module'
import { UsersModule } from '../users/users.module'
import { AppointmentController } from './appointments.controller'
import { AppointmentRepository } from './appointments.repository'
import { AppointmentService } from './appointments.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([AppointmentRepository]),
    CacheModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        ttl: 86400, // 1d
        store: redisStore,
        host: configService.get<string>('cache.host'),
        port: configService.get<string>('cache.port')
      })
    }),
    UsersModule,
    NotificationsModule
  ],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
