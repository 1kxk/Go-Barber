import { IsNotEmpty, IsString } from 'class-validator'

export class SignInDTO {
  @IsNotEmpty()
  @IsString()
  credential: string

  @IsNotEmpty()
  @IsString()
  password: string
}
