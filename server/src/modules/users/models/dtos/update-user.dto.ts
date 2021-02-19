import { IsEmail, IsOptional, IsString, ValidateIf } from 'class-validator'

export class UpdateUserDTO {
  @IsOptional()
  @IsString()
  name: string

  @IsOptional()
  @IsEmail()
  email: string

  @IsOptional()
  @IsString()
  username

  @IsOptional()
  @IsString()
  password: string

  @ValidateIf(o => o.password)
  @IsString()
  confirmPassword: string
}
