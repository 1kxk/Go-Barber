import { Inject, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { User } from '../../../../src/modules/users/models/entities/users.entity'

import { IHashPassword } from './providers/hash-password.provider'

@Injectable()
export class AuthService {
  constructor(
    @Inject('HashProvider')
    private readonly hashPasswordProvider: IHashPassword,
    private readonly jwtService: JwtService
  ) {}

  async generateJwt(user: User): Promise<string> {
    return this.jwtService.signAsync({ user })
  }

  async hashPassword(
    password: string,
    salt?: string | number
  ): Promise<string> {
    return this.hashPasswordProvider.hash(password, salt)
  }

  async comparePassword(
    password: string,
    hashPassword: string
  ): Promise<boolean> {
    return this.hashPasswordProvider.compare(password, hashPassword)
  }
}
