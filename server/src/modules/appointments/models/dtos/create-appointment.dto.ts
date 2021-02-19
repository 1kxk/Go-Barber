import { IsDateString, IsNotEmpty, IsString } from 'class-validator'

export class CreateAppointmentDTO {
  @IsNotEmpty()
  @IsDateString()
  date: string

  @IsNotEmpty()
  @IsString()
  provider_id: string

  @IsNotEmpty()
  @IsString()
  user_id: string
}
