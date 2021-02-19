import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class FindAllAppointmentInDayDTO {
  @IsNotEmpty()
  @IsNumber()
  day: number

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
