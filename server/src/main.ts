import { Logger, ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { ConfigService } from '@nestjs/config'
import { config } from 'dotenv'
import { resolve } from 'path'
import 'colors'

import { AppModule } from './app.module'
import { cwd } from 'process'
import { AllExceptionFilter } from './shared/filters/http-exception.filter'
import { LoggingInterceptor } from './shared/interceptors/logging.interceptor'

config({
  path: resolve(cwd(), `.env.${process.env.NODE_ENV}`)
})

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  app.enableCors()
  const configService = app.get(ConfigService)
  app.setGlobalPrefix('api')
  app.useGlobalFilters(new AllExceptionFilter())
  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true
    })
  )

  await app.listen(configService.get('PORT'))
  Logger.log(
    `Server running on port ${configService.get('PORT')} in ${
      process.env.NODE_ENV
    } mode`.blue.bold
  )
}
bootstrap()
