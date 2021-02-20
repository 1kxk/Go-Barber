import { CacheModule, forwardRef, Module } from '@nestjs/common'
import redisStore from 'cache-manager-redis-store'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../../shared/modules/auth/auth.module'
import { RolesGuard } from './guards/roles.guard'
import { UserIsUser } from './guards/user-is-user.guard'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'
import { StorageModule } from '../../shared/modules/storage/storage.module'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('storage.tmpFolder')
      })
    }),
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
    forwardRef(() => AuthModule),
    StorageModule
  ],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard, UserIsUser],
  exports: [UsersService]
})
export class UsersModule {}
