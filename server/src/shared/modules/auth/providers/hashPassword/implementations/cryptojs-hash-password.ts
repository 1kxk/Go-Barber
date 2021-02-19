import { Injectable } from '@nestjs/common'
import Crypto from 'crypto'

import { IHashPassword } from '../../hash-password.provider'

@Injectable()
export class CryptojsHashPassword implements IHashPassword {
  async compare(password: string, hashPassword: string): Promise<boolean> {
    return (
      Crypto.createHash('sha256').update(password).digest('hex') ===
      hashPassword
    )
  }

  async hash(password: string): Promise<string> {
    return Crypto.createHash('sha256').update(password).digest('hex')
  }
}
