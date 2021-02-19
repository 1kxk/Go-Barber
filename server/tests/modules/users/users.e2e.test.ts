import { INestApplication } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { DeleteResult, UpdateResult } from 'typeorm'
import request from 'supertest'

import { AppModule } from '../../../src/app.module'
import { UserRoles } from '../../../src/modules/users/models/enums/user-roles.enum'
import { UsersRepository } from '../../../src/modules/users/users.repository'
import { usersMock } from '../../mocks/users.mock'
import { SignUpDTO } from '../../../src/modules/users/models/dtos/sign-up.dto'
import { SignInDTO } from '../../../src/modules/users/models/dtos/sign-in.dto'

describe('UsersController (e2e)', () => {
  let app: INestApplication
  let repository: UsersRepository
  let jwtService: JwtService
  let tokenUser: string
  let tokenAdmin: string

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [AppModule]
    }).compile()

    app = module.createNestApplication()
    repository = module.get<UsersRepository>(UsersRepository)
    jwtService = module.get<JwtService>(JwtService)
    tokenUser = await jwtService.signAsync(usersMock)
    tokenAdmin = await jwtService.signAsync({
      ...usersMock,
      role: UserRoles.ADMIN
    })

    await app.init()

    jest
      .spyOn(repository, 'save')
      .mockImplementation(async () => Promise.resolve(usersMock))
    jest
      .spyOn(repository, 'findOne')
      .mockImplementation(async () => Promise.resolve(usersMock))
    jest
      .spyOn(repository, 'find')
      .mockImplementation(async () => Promise.resolve([usersMock]))
    jest
      .spyOn(repository, 'update')
      .mockImplementation(async () => Promise.resolve({} as UpdateResult))
    jest
      .spyOn(repository, 'delete')
      .mockImplementation(async () => Promise.resolve({} as DeleteResult))
  })

  afterEach(async () => {
    await app.close()
  })

  describe('findAll() => /users (GET)', () => {
    it('Should be able to get all users logged as common USER', async () => {
      request(app.getHttpServer())
        .get('/users')
        .set({
          Authorization: `Bearer ${tokenUser}`
        })
        .expect(200)
        .expect([usersMock])
    })

    it('Should not be able to get all users if not logged', async () => {
      request(app.getHttpServer()).get('/users').expect(401)
    })
  })

  describe('findOne() => /users/:id (GET)', () => {
    it('Should be able to get user info logged as common USER', async () => {
      request(app.getHttpServer())
        .get('/users/1')
        .set({
          Authorization: `Bearer ${tokenUser}`
        })
        .expect(200)
        .expect(usersMock)
    })

    it('Should not be able to get user info if not logged', async () => {
      request(app.getHttpServer()).get('/users/1').expect(401)
    })
  })

  describe('updateOne() => /users/:id (PUT)', () => {
    it('Should be able to update own user info', async () => {
      request(app.getHttpServer())
        .put(`/users/${usersMock.id}`)
        .set({
          Authorization: `Bearer ${tokenUser}`
        })
        .expect(200)
        .expect(usersMock)
    })

    it('Should be able to update any user as an ADMIN user', async () => {
      request(app.getHttpServer())
        .put('/users/1')
        .set({
          Authorization: `Bearer ${tokenAdmin}`
        })
        .expect(200)
        .expect(usersMock)
    })

    it('Should not be able to update other user info', async () => {
      request(app.getHttpServer())
        .put('/users/1')
        .set({
          Authorization: `Bearer ${tokenUser}`
        })
        .expect(403)
    })

    it('Should not be able to get user info if not logged', async () => {
      request(app.getHttpServer()).put('/users/1').expect(401)
    })
  })

  describe('updateUserRole() => /users/update-role/:id (PATCH)', () => {
    it('Should not be able to update any user role', async () => {
      request(app.getHttpServer())
        .put(`/users/update-role/${usersMock.id}`)
        .set({
          Authorization: `Bearer ${tokenUser}`
        })
        .expect(403)
        .expect(usersMock)
    })

    it('Should be able to update any user role as an ADMIN user', async () => {
      request(app.getHttpServer())
        .put('/users/update-role/1')
        .set({
          Authorization: `Bearer ${tokenAdmin}`
        })
        .expect(200)
        .expect(usersMock)
    })

    it('Should not be able to get user info if not logged', async () => {
      request(app.getHttpServer()).patch('/users/update-role/1').expect(401)
    })
  })

  describe('deleteOne() => /users/:id (DELETE)', () => {
    it('Should be able to delete own user', async () => {
      request(app.getHttpServer())
        .delete(`/users/${usersMock.id}`)
        .set({
          Authorization: `Bearer ${tokenUser}`
        })
        .expect(200)
        .expect(usersMock)
    })

    it('Should be able to delete any user as an ADMIN user', async () => {
      request(app.getHttpServer())
        .delete('/users/1')
        .set({
          Authorization: `Bearer ${tokenAdmin}`
        })
        .expect(200)
        .expect(usersMock)
    })

    it('Should not be able to delete other user info', async () => {
      request(app.getHttpServer())
        .delete('/users/1')
        .set({
          Authorization: `Bearer ${tokenUser}`
        })
        .expect(403)
    })

    it('Should not be able to get user info if not logged', async () => {
      request(app.getHttpServer()).delete('/users/1').expect(401)
    })
  })

  describe('signUp() => /users/signup (POST)', () => {
    it('Should be able to create a new user', async () => {
      const requestPayload = {
        name: 'name',
        email: 'email@example.com',
        username: 'username',
        password: 'password',
        confirmPassword: 'password'
      } as SignUpDTO

      request(app.getHttpServer())
        .post('/users/signup')
        .set(requestPayload)
        .expect(201)
        .expect(usersMock)
    })
  })

  describe('signIn() => /users/signin (POST)', () => {
    it('Should be able to create a new user', async () => {
      const requestPayload = {
        credential: 'email@example.com',
        password: 'password'
      } as SignInDTO

      request(app.getHttpServer())
        .post('/users/signin')
        .set(requestPayload)
        .expect(200)
        .expect(usersMock)
    })
  })
})
