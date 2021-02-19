import {
  ConflictException,
  Inject,
  Injectable,
  PreconditionFailedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import {
  startOfHour,
  isBefore,
  getHours,
  isAfter,
  getDaysInMonth,
  getDate
} from 'date-fns'

import { AppointmentRepository } from './appointments.repository'
import { Appointment } from './models/entities/appointments.entity'
import { CreateAppointmentDTO } from './models/dtos/create-appointment.dto'
import { User } from '../../modules/users/models/entities/users.entity'
import { UsersService } from '../../modules/users/users.service'
import { FindAllAppointmentInDayDTO } from './models/dtos/find-all-appointment-in-day.dto'
import { ProviderDayAvailability } from './models/provider-day-availability'
import { FindAllAppointmentInMonthDTO } from './models/dtos/find-all-appointment-in-month.dto'
import { ProviderMonthAvailability } from './models/provider-month-availability'

@Injectable()
export class AppointmentService {
  constructor(
    @InjectRepository(AppointmentRepository)
    private readonly appointmentsRepository: AppointmentRepository,

    @Inject(UsersService)
    private readonly usersService: UsersService
  ) {}

  async create(payload: CreateAppointmentDTO): Promise<Appointment> {
    const { date, provider_id, user_id } = payload

    const appointmentDate = startOfHour(new Date(date))
    const currentDate = startOfHour(new Date())

    if (isBefore(appointmentDate, currentDate)) {
      throw new PreconditionFailedException(
        "You can't create an appoinment on a past date"
      )
    }

    if (user_id === provider_id) {
      throw new PreconditionFailedException(
        "You can't create an appointment with yourself"
      )
    }

    if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
      throw new PreconditionFailedException(
        'You can only create an appointment between 8am and 6pm'
      )
    }

    const findAppointmentSameDay = await this.appointmentsRepository.findByDate(
      appointmentDate
    )

    if (findAppointmentSameDay) {
      throw new ConflictException('This appointment is already booked.')
    }

    const appointment = this.appointmentsRepository.create({
      date: appointmentDate,
      provider_id,
      user_id
    })

    return this.appointmentsRepository.save(appointment)
  }

  async getProvidersList(user_id: string): Promise<User[]> {
    return this.usersService.findAll(user_id)
  }

  async listProvidersAppointment(
    payload: FindAllAppointmentInDayDTO
  ): Promise<Appointment[]> {
    return this.appointmentsRepository.findAllInDayFromProvider(payload)
  }

  async listProviderDayAvailability(
    payload: FindAllAppointmentInDayDTO
  ): Promise<ProviderDayAvailability[]> {
    const { day, month, year } = payload
    const appointments = await this.appointmentsRepository.findAllInDayFromProvider(
      payload
    )

    const hoursStart = 8
    const currentDate = new Date()

    const eachHourArray = Array.from(
      { length: 10 },
      (_, index) => index + hoursStart
    )

    return eachHourArray.map(hour => {
      const hasAppointmentInHour = appointments.find(
        appointment => getHours(appointment.date) === hour
      )

      const compareDate = new Date(year, month - 1, day, hour)

      return {
        hour,
        available: !hasAppointmentInHour && isAfter(compareDate, currentDate)
      }
    })
  }

  async listProviderMonthAvailability(
    payload: FindAllAppointmentInMonthDTO
  ): Promise<ProviderMonthAvailability[]> {
    const { month, year } = payload
    const appointments = await this.appointmentsRepository.findAllInMonthProvider(
      payload
    )

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1))

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1
    )

    return eachDayArray.map(day => {
      const availabilityInDay = appointments.filter(
        appointment => getDate(appointment.date) === day
      )

      return {
        day,
        available: availabilityInDay.length < 10
      }
    })
  }
}
