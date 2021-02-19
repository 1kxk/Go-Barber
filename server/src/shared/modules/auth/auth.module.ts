import { forwardRef, Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { ConfigModule, ConfigService } from '@nestjs/config'

import { AuthService } from './auth.service'
import { UsersModule } from '../../../modules/users/users.module'
import { JwtAuthGuard } from './guards/jwt.guard'
import { JwtStrategy } from './guards/jwt.strategy'
import { CryptojsHashPassword } from './providers/hashPassword/implementations/cryptojs-hash-password'

@Module({
  imports: [
    forwardRef(() => UsersModule),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      })
    })
  ],
  providers: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy,
    {
      provide: 'HashProvider',
      useClass: CryptojsHashPassword
    }
  ],
  exports: [AuthService]
})
export class AuthModule {}
