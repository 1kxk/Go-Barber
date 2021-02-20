import { Exclude } from 'class-transformer'
import {
  BaseEntity,
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'
import { UserRoles } from '../../models/enums/user-roles.enum'

@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column({ unique: true })
  username: string

  @Column({ unique: true })
  email: string

  @Column()
  avatar: string

  @Exclude()
  @Column()
  password: string

  @Exclude()
  @Column({ default: false })
  confirmed: boolean

  @Column({ type: 'enum', enum: UserRoles, default: UserRoles.USER })
  role: UserRoles

  @CreateDateColumn()
  created_at: Date

  @UpdateDateColumn()
  updated_at: Date

  @BeforeInsert()
  cleanEmail() {
    this.email = this.email.toLowerCase()
    this.email = this.email.trim()
  }

  // @Expose({ name: 'avatar_url' })
  // getAvatar_url(): string | null {
  //   return this.avatar ? 'url_path' : null
  // }
}
