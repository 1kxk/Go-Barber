import Crypto from 'crypto'

import { CryptojsHashPassword } from '../../../../../../../src/shared/modules/auth/providers/hashPassword/implementations/cryptojs-hash-password'

jest.mock('crypto', () => ({
  createHash(_algorithm: string) {
    return {
      update(_data: Crypto.BinaryLike) {
        return {
          digest(_encoding: Crypto.HexBase64Latin1Encoding) {
            return 'hash'
          }
        }
      }
    }
  }
}))

describe('Auth Service', () => {
  let sut: CryptojsHashPassword

  beforeEach(async () => {
    sut = new CryptojsHashPassword()
  })

  describe('hash()', () => {
    it('Should be able to hash the password', async () => {
      const promise = sut.hash('password')
      await expect(promise).resolves.toEqual('hash')
    })
  })

  describe('compare()', () => {
    it('Should be able to compare hashed password with plain text password', async () => {
      const promise = sut.compare('password', 'hash')
      await expect(promise).resolves.toEqual(true)
    })
  })
})
