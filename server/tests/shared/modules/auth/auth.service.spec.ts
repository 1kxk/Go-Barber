import { JwtService } from '@nestjs/jwt'
import MockDate from 'mockdate'

import { AuthService } from '../../../../src/shared/modules/auth/auth.service'
import { CryptojsHashPassword } from '../../../../src/shared/modules/auth/providers/hashPassword/implementations/cryptojs-hash-password'
import { IHashPassword } from '../../../../src/shared/modules/auth/providers/hash-password.provider'
import { usersMock } from '../../../mocks/users.mock'

MockDate.set(1613196228182)

describe('Auth Service', () => {
  let sut: AuthService
  let jwtService: JwtService
  let hashPassword: IHashPassword

  beforeEach(async () => {
    jwtService = new JwtService({
      secret: 'secret',
      signOptions: { expiresIn: '1d' }
    })
    hashPassword = new CryptojsHashPassword()
    sut = new AuthService(hashPassword, jwtService)

    jest
      .spyOn(jwtService, 'signAsync')
      .mockImplementation(async () => Promise.resolve('token'))
    jest.spyOn(hashPassword, 'hash').mockImplementation(async () => 'hash')
    jest.spyOn(hashPassword, 'compare').mockImplementation(async () => true)
  })

  describe('generateJwt()', () => {
    it('Should be able to generate Jwt token', async () => {
      const promise = sut.generateJwt(usersMock)
      await expect(promise).resolves.toEqual('token')
    })
  })

  describe('hashPassword()', () => {
    it('Should be able to hash the password', async () => {
      const promise = sut.hashPassword('password')
      await expect(promise).resolves.toEqual('hash')
    })
  })

  describe('comparePassword()', () => {
    it('Should be able to compare hashed password with plain text password', async () => {
      const promise = sut.comparePassword('password', 'hashedPassword')
      await expect(promise).resolves.toEqual(true)
    })
  })
})
