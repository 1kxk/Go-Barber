import { Test, TestingModule } from '@nestjs/testing'
import { DeleteResult, UpdateResult } from 'typeorm'
import MockDate from 'mockdate'

import { AppModule } from '../../../src/app.module'
import { UsersRepository } from '../../../src/modules/users/users.repository'
import { usersMock } from '../../mocks/users.mock'

MockDate.set(1613196228182)

describe('Users Repository', () => {
  let sut: UsersRepository

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    sut = app.get<UsersRepository>(UsersRepository)

    jest
      .spyOn(sut, 'save')
      .mockImplementation(async () => Promise.resolve(usersMock))
    jest
      .spyOn(sut, 'findOne')
      .mockImplementation(async () => Promise.resolve(usersMock))
    jest
      .spyOn(sut, 'find')
      .mockImplementation(async () => Promise.resolve([usersMock]))
    jest
      .spyOn(sut, 'update')
      .mockImplementation(async () => Promise.resolve({} as UpdateResult))
    jest
      .spyOn(sut, 'delete')
      .mockImplementation(async () => Promise.resolve({} as DeleteResult))
  })

  describe('', () => {
    it('', async () => {})
  })
})
