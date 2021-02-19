import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger
} from '@nestjs/common'
import { Response } from 'express'

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(AllExceptionFilter.name)

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest()
    const response = ctx.getResponse<Response>()

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR

    const message: any =
      exception instanceof HttpException ? exception.getResponse() : exception

    this.logger.error(
      `Http Status: ${status} Error message: ${JSON.stringify(message)}`
    )

    response.status(status).send({
      _timestamp: Date.now(),
      _links: {
        self: {
          href: request.url
        }
      },
      error: {
        status: message.statusCode,
        type: message.error,
        message: message.message
      }
    })
  }
}
