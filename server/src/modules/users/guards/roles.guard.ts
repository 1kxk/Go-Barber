import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from '../models/entities/users.entity'
import { UsersService } from '../users.service'

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private readonly usersService: UsersService
  ) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<string[]>('roles', context.getHandler())
    if (!roles) return true

    const request = context.switchToHttp().getRequest()
    const user: User = request.user

    return from(this.usersService.findOne(user.id)).pipe(
      map((user: User) => {
        const hasRoles = () => roles.indexOf(user.role) > -1
        let hasPermission = false

        if (hasRoles()) hasPermission = true
        return user && hasPermission
      })
    )
  }
}
