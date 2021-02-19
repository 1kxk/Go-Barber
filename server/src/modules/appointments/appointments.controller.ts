import { Body, Controller, Post } from '@nestjs/common'

import { AppointmentService } from './appointments.service'
import { Appointment } from './models/entities/appointments.entity'
import { CreateAppointmentDTO } from './models/dtos/create-appointment.dto'

@Controller('appointments')
export class AppointmentController {
  constructor(private readonly appointmentService: AppointmentService) {}

  @Post()
  async createAppointment(
    @Body() payload: CreateAppointmentDTO
  ): Promise<Appointment> {
    return this.appointmentService.create(payload)
  }
}
