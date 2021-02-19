import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'
import { from, Observable } from 'rxjs'
import { map } from 'rxjs/operators'
import { User } from '../models/entities/users.entity'
import { UsersService } from '../users.service'

@Injectable()
export class UserIsUser implements CanActivate {
  constructor(private readonly usersService: UsersService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest()

    const params = request.params
    const user: User = request.user

    return from(this.usersService.findOne(user.id)).pipe(
      map((user: User) => {
        let hasPermission = true

        if (user.id === String(params.id)) hasPermission = true

        return user && hasPermission
      })
    )
  }
}
