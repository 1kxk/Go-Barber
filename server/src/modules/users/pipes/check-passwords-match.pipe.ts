import { BadRequestException, PipeTransform } from '@nestjs/common'

export class CheckPasswordsMatch implements PipeTransform {
  transform(value: any) {
    if (value.password !== value.confirmPassword) {
      throw new BadRequestException("Passwords don't match")
    }

    return value
  }
}
