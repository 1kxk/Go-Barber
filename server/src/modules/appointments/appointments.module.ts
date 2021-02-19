import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { UsersModule } from '../users/users.module'
import { AppointmentController } from './appointments.controller'
import { AppointmentRepository } from './appointments.repository'
import { AppointmentService } from './appointments.service'

@Module({
  imports: [TypeOrmModule.forFeature([AppointmentRepository]), UsersModule],
  controllers: [AppointmentController],
  providers: [AppointmentService]
})
export class AppointmentModule {}
