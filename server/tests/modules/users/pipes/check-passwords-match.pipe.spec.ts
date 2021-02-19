import { Test, TestingModule } from '@nestjs/testing'

import { AppModule } from '../../../../src/app.module'
import { CheckPasswordsMatch } from '../../../../src/modules/users/pipes/check-passwords-match.pipe'
import { SignUpDTO } from '../../../../src/modules/users/models/dtos/sign-up.dto'

const usersMock = {
  name: 'name',
  username: 'username',
  email: 'email@example.com',
  password: 'password',
  confirmPassword: 'password'
} as SignUpDTO

describe('Users Pipe', () => {
  let sut: CheckPasswordsMatch

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    sut = app.get<CheckPasswordsMatch>(CheckPasswordsMatch)
  })

  describe('transform()', () => {
    it('Should be able to confirm passwords match', async () => {
      const response = sut.transform(usersMock)

      expect(response).toBeTruthy()
    })

    it('Should not be able to confirm passwords', async () => {
      const mockRequest = {
        ...usersMock,
        confirmPassword: 'wrong-password'
      }

      expect(() => sut.transform(mockRequest)).toThrow()
    })
  })
})
