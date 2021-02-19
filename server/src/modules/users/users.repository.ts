import { EntityRepository, Not, Repository } from 'typeorm'

import { User } from './models/entities/users.entity'

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async findAllProviders(user_id?: string): Promise<User[]> {
    if (user_id) {
      return this.find({
        where: { id: Not(user_id) }
      })
    } else {
      return this.find()
    }
  }
}
