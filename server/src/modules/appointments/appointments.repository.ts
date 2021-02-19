import { EntityRepository, Raw, Repository } from 'typeorm'
import { FindAllAppointmentInDayDTO } from './models/dtos/find-all-appointment-in-day.dto'
import { FindAllAppointmentInMonthDTO } from './models/dtos/find-all-appointment-in-month.dto'
import { Appointment } from './models/entities/appointments.entity'

@EntityRepository(Appointment)
export class AppointmentRepository extends Repository<Appointment> {
  async findByDate(date: Date) {
    return this.find({ where: { date } })
  }

  async findAllInDayFromProvider(
    payload: FindAllAppointmentInDayDTO
  ): Promise<Appointment[]> {
    const { day, month, provider_id, year } = payload
    const parsedDay = String(day).padStart(2, '0')
    const parsedMonth = String(month).padStart(2, '0')

    return await this.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'YYYY-MM-DD') = ${year}-${parsedMonth}-${parsedDay}`
        )
      }
    })
  }

  async findAllInMonthProvider(payload: FindAllAppointmentInMonthDTO) {
    const { month, provider_id, year } = payload
    const parsedMonth = String(month).padStart(2, '0')

    return this.find({
      where: {
        provider_id,
        date: Raw(
          dateFieldName =>
            `to_char(${dateFieldName}, 'YYYY-MM') = ${year}-${parsedMonth}`
        )
      }
    })
  }
}
