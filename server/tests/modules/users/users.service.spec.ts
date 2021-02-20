import { Test, TestingModule } from '@nestjs/testing'
import {
  ConflictException,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { DeleteResult, UpdateResult } from 'typeorm'

import { AppModule } from '../../../src/app.module'
import { UsersService } from '../../../src/modules/users/users.service'
import { UsersRepository } from '../../../src/modules/users/users.repository'
import { UserRoles } from '../../../src/modules/users/models/enums/user-roles.enum'
import { AuthService } from '../../../src/shared/modules/auth/auth.service'
import { SignUpDTO } from '../../../src/modules/users/models/dtos/sign-up.dto'
import { SignInDTO } from '../../../src/modules/users/models/dtos/sign-in.dto'
import { usersMock } from '../../mocks/users.mock'
import { StorageService } from '../../../src/shared/modules/storage/storage.service'

const id = '22d0431e-50e2-4c86-a0a3-b414a43def4f'
describe('Users Service', () => {
  let sut: UsersService
  let authService: AuthService
  let usersRepository: UsersRepository
  let storageService: StorageService

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sut = app.get<UsersService>(UsersService)
    authService = app.get<AuthService>(AuthService)
    usersRepository = app.get<UsersRepository>(UsersRepository)
    storageService = app.get<StorageService>(StorageService)

    jest
      .spyOn(usersRepository, 'save')
      .mockImplementation(async () => Promise.resolve(usersMock))
    jest
      .spyOn(usersRepository, 'findOne')
      .mockImplementation(async () => Promise.resolve(usersMock))
    jest
      .spyOn(usersRepository, 'find')
      .mockImplementation(async () => Promise.resolve([usersMock]))
    jest
      .spyOn(usersRepository, 'update')
      .mockImplementation(async () => Promise.resolve({} as UpdateResult))
    jest
      .spyOn(usersRepository, 'delete')
      .mockImplementation(async () => Promise.resolve({} as DeleteResult))
    jest
      .spyOn(authService, 'hashPassword')
      .mockImplementation(async () => Promise.resolve('hash'))
    jest
      .spyOn(authService, 'comparePassword')
      .mockImplementation(async () => Promise.resolve(true))
    jest
      .spyOn(authService, 'generateJwt')
      .mockImplementation(async () => Promise.resolve('token'))
    jest
      .spyOn(storageService, 'saveFile')
      .mockImplementation(async () => Promise.resolve('path'))
  })

  describe('findAll()', () => {
    it('Should be able to retrieve all users', async () => {
      const promise = sut.findAll()

      await expect(promise).resolves.toEqual([usersMock])
    })
  })

  describe('findOne()', () => {
    it('Should be able to retrieve one user given id', async () => {
      const promise = sut.findOne('fake-id')

      await expect(promise).resolves.toEqual(usersMock)
    })

    it('Should be to throw if no user was found given id', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => undefined)

      const promise = sut.findOne('fake-id')

      await expect(promise).rejects.toBeInstanceOf(NotFoundException)
    })
  })

  // describe('updateOne()', () => {
  //   let updateMock: User
  //   let requestPayload: UpdateUserDTO

  //   beforeEach(() => {
  //     requestPayload = {
  //       name: 'name2',
  //       username: 'username2',
  //       email: 'email2@example.com',
  //       password: 'password2',
  //       confirmPassword: 'password2'
  //     }

  //     updateMock = {
  //       id,
  //       name: 'name2',
  //       username: 'username2',
  //       password: 'hash',
  //       role: UserRoles.USER,
  //       email: 'email2@example.com',
  //       confirmed: false,
  //       avatar: '',
  //       created_at: new Date(),
  //       updated_at: new Date()
  //     } as User
  //   })

  //   it('Should be able to update a user', async () => {
  //     jest
  //       .spyOn(usersRepository, 'findOne')
  //       .mockImplementationOnce(async () => Promise.resolve(usersMock))
  //       .mockImplementationOnce(async () => Promise.resolve(undefined))
  //       .mockImplementationOnce(async () => Promise.resolve(undefined))

  //     const promise = sut.updateOne('id', requestPayload)

  //     await expect(promise).resolves.toEqual(updateMock)
  //   })

  //   it('Should not be able to update a user within an existing username', async () => {
  //     jest
  //       .spyOn(usersRepository, 'findOne')
  //       .mockImplementationOnce(async () => Promise.resolve(usersMock))
  //       .mockImplementationOnce(async () => Promise.resolve(usersMock))
  //       .mockImplementationOnce(async () => Promise.resolve(undefined))

  //     const promise = sut.updateOne('fake-id', requestPayload)

  //     await expect(promise).rejects.toBeInstanceOf(ConflictException)
  //   })

  //   it('Should not be able to update a user within an existing email', async () => {
  //     jest
  //       .spyOn(usersRepository, 'findOne')
  //       .mockImplementationOnce(async () => Promise.resolve(usersMock))
  //       .mockImplementationOnce(async () => Promise.resolve(undefined))
  //       .mockImplementationOnce(async () => Promise.resolve(usersMock))

  //     const promise = sut.updateOne('fake-id', requestPayload)

  //     await expect(promise).rejects.toBeInstanceOf(ConflictException)
  //   })
  // })

  describe('updateRole()', () => {
    it('Should be able to update a role', async () => {
      const userResponse = {
        ...usersMock,
        role: UserRoles.ADMIN
      }

      const promise = sut.updateRole('fake-id', UserRoles.ADMIN)
      await expect(promise).resolves.toEqual(userResponse)
    })
  })

  describe('deleteOne()', () => {
    it('Should be able to delete a user', async () => {
      const promise = sut.deleteOne('fake-id')

      await expect(promise).resolves.toBeUndefined()
    })
  })

  describe('singUp()', () => {
    let payloadRequest: SignUpDTO

    beforeEach(() => {
      payloadRequest = {
        name: 'name',
        email: 'email',
        username: 'username',
        password: 'password',
        confirmPassword: 'password'
      }
    })

    it('Should be able to create a new user', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => Promise.resolve(undefined))

      const promise = sut.singUp(payloadRequest)
      await expect(promise).resolves.toEqual(usersMock)
    })

    it('Should not be able create a user that is already signed', async () => {
      const promise = sut.singUp(payloadRequest)
      await expect(promise).rejects.toBeInstanceOf(ConflictException)
    })
  })

  describe('signIn()', () => {
    let payloadRequest: SignInDTO

    beforeEach(() => {
      payloadRequest = {
        credential: 'credential',
        password: 'password'
      }
    })

    it('Should be able to sign in', async () => {
      const promise = sut.signIn(payloadRequest)

      await expect(promise).resolves.toEqual({ token: 'token', user_id: id })
    })

    it('Should not be able to signIn if user dont exists', async () => {
      jest
        .spyOn(usersRepository, 'findOne')
        .mockImplementation(async () => Promise.resolve(undefined))

      const promise = sut.signIn(payloadRequest)

      await expect(promise).rejects.toBeInstanceOf(NotFoundException)
    })

    it("Should not be able to signIn if passwords don't match", async () => {
      jest
        .spyOn(authService, 'comparePassword')
        .mockImplementation(async () => Promise.resolve(undefined))

      const promise = sut.signIn(payloadRequest)

      await expect(promise).rejects.toBeInstanceOf(UnauthorizedException)
    })
  })
})
