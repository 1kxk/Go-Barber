import { Injectable } from '@nestjs/common'
import * as bcryptjs from 'bcryptjs'

import { IHashPassword } from '../../hash-password.provider'

@Injectable()
export class BcryptjsHashPassword implements IHashPassword {
  async compare(password: string, hashPassword: string): Promise<boolean> {
    return bcryptjs.compare(password, hashPassword)
  }

  async hash(password: string, salt?: number | string): Promise<string> {
    return bcryptjs.hash(password, salt || 12)
  }
}
