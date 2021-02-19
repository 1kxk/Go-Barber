import { registerAs } from '@nestjs/config'

export const sqlDatabase = registerAs('sqlDatabase', () => ({
  name: process.env.SQL_NAME,
  type: process.env.SQL_TYPE,
  url: process.env.SQL_CONNECTION,
  username: process.env.SQL_USERNAME,
  password: process.env.SQL_PASSWORD,
  host: process.env.SQL_HOST,
  port: Number(process.env.SQL_PORT),
  database: process.env.SQL_DATABASE,
  synchronize: process.env.SQL_SYNCHRONIZE == 'true',
  autoLoadEntities: process.env.SQL_AUTOLOADENTITIES == 'true'
}))

export const nosqlDatabase = registerAs('nosqlDatabase', () => ({
  name: process.env.NOSQL_NAME,
  type: process.env.NOSQL_TYPE,
  url: process.env.NOSQL_CONNECTION,
  username: process.env.NOSQL_USERNAME,
  password: process.env.NOSQL_PASSWORD,
  host: process.env.NOSQL_HOST,
  port: Number(process.env.NOSQL_PORT),
  database: process.env.NOSQL_DATABASE
}))
