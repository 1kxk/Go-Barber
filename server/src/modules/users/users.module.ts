import { forwardRef, Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthModule } from '../../shared/modules/auth/auth.module'
import { RolesGuard } from './guards/roles.guard'
import { UserIsUser } from './guards/user-is-user.guard'
import { UsersController } from './users.controller'
import { UsersRepository } from './users.repository'
import { UsersService } from './users.service'

@Module({
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    forwardRef(() => AuthModule),
    MulterModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        dest: configService.get<string>('storage.tmpFolder')
      })
    })
  ],
  controllers: [UsersController],
  providers: [UsersService, RolesGuard, UserIsUser],
  exports: [UsersService]
})
export class UsersModule {}
