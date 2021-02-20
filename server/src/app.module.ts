import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { MongooseModule } from '@nestjs/mongoose'

import { authConfig } from './config/auth.config'
import { nosqlDatabase, sqlDatabase } from './config/database.config'
import { storageConfig } from './config/storage.config'
import { AppointmentModule } from './modules/appointments/appointments.module'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './shared/modules/auth/auth.module'
import { NotificationsModule } from './modules/notifications/notifications.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      cache: true,
      load: [sqlDatabase, nosqlDatabase, authConfig, storageConfig],
      envFilePath: [`.env.${process.env.NODE_ENV}`]
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        name: configService.get('sqlDatabase.name'),
        host: configService.get('sqlDatabase.host'),
        port: configService.get('sqlDatabase.port'),
        username: configService.get('sqlDatabase.username'),
        password: configService.get('sqlDatabase.password'),
        database: configService.get('sqlDatabase.database'),
        entities: [__dirname + '/../dist/modules/**/models/entities/*.js'],
        synchronize: configService.get('sqlDatabase.synchronize'),
        autoLoadEntities: configService.get('sqlDatabase.autoLoadEntities'),
        keepConnectionAlive: true
      })
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],

      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('nosqlDatabase.url'),
        connectionName: configService.get('nosqlDatabase.name'),
        dbName: configService.get('nosqlDatabase.database'),
        entities: [__dirname + '/../dist/modules/**/models/entities/*.js'],
        keepAlive: true
      })
    }),
    AuthModule,
    UsersModule,
    AppointmentModule,
    NotificationsModule
  ]
})
export class AppModule {}
