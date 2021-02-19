import {
  ConflictException,
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { AuthService } from '../../shared/modules/auth/auth.service'
import { SignInDTO } from './models/dtos/sign-in.dto'
import { SignUpDTO } from './models/dtos/sign-up.dto'
import { UpdateUserDTO } from './models/dtos/update-user.dto'
import { User } from './models/entities/users.entity'
import { UserRoles } from './models/enums/user-roles.enum'
import { SignIn } from './models/SignIn'
import { UsersRepository } from './users.repository'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,

    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService
  ) {}

  async findAll(user_id?: string): Promise<User[]> {
    return this.usersRepository.findAllProviders(user_id)
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne(id)

    if (!user) throw new NotFoundException('User could not be found!')

    return user
  }

  async updateOne(id: string, payload: UpdateUserDTO): Promise<User> {
    const user = await this.findOne(id)

    if (payload.username !== user.username) {
      const usernameExists = await this.usersRepository.findOne({
        where: { username: payload.username }
      })

      if (usernameExists) {
        throw new ConflictException('Username already registered!')
      }
      user.username = payload?.username ?? user.username
    }

    if (payload.email !== user.email) {
      const emailExists = await this.usersRepository.findOne({
        where: { email: payload.email }
      })

      if (emailExists) {
        throw new ConflictException('Email already registered!')
      }
      user.email = payload?.email ?? user.email
    }

    if (payload.password) {
      user.password = await this.authService.hashPassword(payload.password)
    }

    user.name = payload.name ?? user.name
    await this.usersRepository.update(id, user)
    return user
  }

  async updateRole(id: string, role: UserRoles): Promise<User> {
    const user = await this.findOne(id)

    const updatedUser = this.usersRepository.create({ ...user, role })
    await this.usersRepository.update(id, updatedUser)
    return updatedUser
  }

  async deleteOne(id: string): Promise<void> {
    await this.findOne(id)
    await this.usersRepository.delete(id)
  }

  async singUp(payload: SignUpDTO): Promise<User> {
    let user = await this.findByUsernameOrEmail(payload.username, payload.email)

    if (user) throw new ConflictException('User already signed')

    const hashedPassword = await this.authService.hashPassword(payload.password)

    user = this.usersRepository.create(payload)
    user.password = hashedPassword
    return this.usersRepository.save(user)
  }

  async signIn(payload: SignInDTO): Promise<SignIn> {
    const user = await this.findByUsernameOrEmail(
      payload.credential,
      payload.credential
    )

    if (!user) throw new NotFoundException('User could not be found')

    const passwordCheck = await this.authService.comparePassword(
      payload.password,
      user.password
    )
    if (!passwordCheck) throw new UnauthorizedException('Wrong credentials')

    const token = await this.authService.generateJwt(user)

    return { token, user_id: user.id }
  }

  async updateAvatar(_file: any): Promise<any> {}

  private async findByUsernameOrEmail(
    username: string,
    email: string
  ): Promise<User> {
    return this.usersRepository.findOne({
      where: [{ username }, { email }]
    })
  }
}
