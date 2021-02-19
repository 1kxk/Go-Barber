import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class FindAllAppointmentInMonthDTO {
  @IsNotEmpty()
  @IsNumber()
  month: number

  @IsNotEmpty()
  @IsString()
  provider_id: string

  @IsNotEmpty()
  @IsNumber()
  year: number
}
