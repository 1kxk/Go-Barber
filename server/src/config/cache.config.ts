import { registerAs } from '@nestjs/config'

export const cacheConfig = registerAs('cache', () => ({
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT
}))

export enum Keys {
  USER = 'user',
  USERS_LIST = 'users_list',
  PROVIDERS_LIST = 'providers_list',
  PROVIDER_APPOINTMENTS = 'provider_appointments'
}
