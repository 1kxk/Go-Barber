import {
  Body,
  CacheInterceptor,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors
} from '@nestjs/common'
import { FileInterceptor } from '@nestjs/platform-express'
import { classToClass } from 'class-transformer'

import { JwtAuthGuard } from '../../shared/modules/auth/guards/jwt.guard'
import { hasRoles } from './decorators/roles.decorator'
import { SignInDTO } from './models/dtos/sign-in.dto'
import { SignUpDTO } from './models/dtos/sign-up.dto'
import { UpdateUserDTO } from './models/dtos/update-user.dto'
import { User } from './models/entities/users.entity'
import { UserRoles } from './models/enums/user-roles.enum'
import { RolesGuard } from './guards/roles.guard'
import { UserIsUser } from './guards/user-is-user.guard'
import { SignIn } from './models/SignIn'
import { CheckPasswordsMatch } from './pipes/check-passwords-match.pipe'
import { UsersService } from './users.service'
import { AuthUser } from './decorators/auth-user.decorator'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @CacheTTL(10)
  @UseInterceptors(CacheInterceptor)
  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Query('user_id') user_id: string): Promise<User[]> {
    const users = await this.usersService.findAll(user_id)
    return users.map(user => classToClass(user))
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<User> {
    const user = await this.usersService.findOne(id)
    return classToClass(user)
  }

  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, UserIsUser || RolesGuard)
  @Put(':id')
  async updateOne(
    @AuthUser() user: User,
    @Body(CheckPasswordsMatch) payload: UpdateUserDTO
  ): Promise<User> {
    const updatedUser = await this.usersService.updateOne(user.id, payload)
    return classToClass(updatedUser)
  }

  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Patch('update-role/:id')
  async updateUserRole(
    @AuthUser() user: User,
    @Body('newRole') role: any
  ): Promise<User> {
    const updatedUser = await this.usersService.updateRole(user.id, role)
    return classToClass(updatedUser)
  }

  @hasRoles(UserRoles.ADMIN)
  @UseGuards(JwtAuthGuard, UserIsUser || RolesGuard)
  @Delete(':id')
  async deleteOne(@AuthUser() user: User): Promise<void> {
    return this.usersService.deleteOne(user.id)
  }

  @Post('signup')
  async signUp(@Body(CheckPasswordsMatch) payload: SignUpDTO): Promise<User> {
    const user = await this.usersService.singUp(payload)
    return classToClass(user)
  }

  @Post('signin')
  async signIn(@Body() payload: SignInDTO): Promise<SignIn> {
    return this.usersService.signIn(payload)
  }

  @Patch('avatar')
  @UseGuards(JwtAuthGuard, UserIsUser)
  @UseInterceptors(FileInterceptor('file'))
  async updateAvatar(
    @AuthUser() user: User,
    @UploadedFile() file: Express.Multer.File
  ): Promise<User> {
    const updatedUser = await this.usersService.updateAvatar(
      user.id,
      file.filename
    )
    return classToClass(updatedUser)
  }
}
