import { Inject, Injectable } from '@nestjs/common'

import { SendMailDTO } from './dtos/send-email.dto'
import { IMailProvider } from './providers/mail/email.provider'

@Injectable()
export class MailService {
  constructor(
    @Inject('MailProvider')
    private readonly mailProvider: IMailProvider
  ) {}

  async sendMail(payload: SendMailDTO): Promise<void> {
    return this.mailProvider.sendMail(payload)
  }
}
