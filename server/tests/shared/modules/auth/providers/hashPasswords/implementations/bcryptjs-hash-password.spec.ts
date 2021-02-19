import { BcryptjsHashPassword } from '../../../../../../../src/shared/modules/auth/providers/hashPassword/implementations/bcryptjs-hash-password'

jest.mock('bcryptjs', () => ({
  compare(_s: string, _hash: string) {
    return true
  },
  hash(_s: string, _salt: number | string) {
    return 'hash'
  }
}))

describe('Auth Service', () => {
  let sut: BcryptjsHashPassword

  beforeEach(async () => {
    sut = new BcryptjsHashPassword()
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
