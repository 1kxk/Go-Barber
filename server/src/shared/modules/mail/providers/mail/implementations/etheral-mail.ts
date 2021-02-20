import { Inject, Injectable } from '@nestjs/common'
import nodemailer from 'nodemailer'
import Mail from 'nodemailer/lib/mailer'

import { SendMailDTO } from '../../../dtos/send-email.dto'
import { IMailTemplateProvider } from '../../mailTemplate/email-template.provider'
import { IMailProvider } from '../email.provider'

@Injectable()
export class EtheralMailProvider implements IMailProvider {
  private client: Mail

  constructor(
    @Inject('MailTemplateProvider')
    private readonly mailTemplateProvider: IMailTemplateProvider
  ) {
    nodemailer.createTestAccount().then(account => {
      const transporter = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      })

      this.client = transporter
    })
  }

  async sendMail(payload: SendMailDTO): Promise<void> {
    const { subject, from, to, templateData } = payload

    const message = await this.client.sendMail({
      from: {
        name: from?.name ?? 'Gobarber equip',
        address: from?.email ?? 'equip@gobarber.com.br'
      },
      to: {
        name: to?.name,
        address: to?.email
      },
      subject,
      html: await this.mailTemplateProvider.parse(templateData)
    })

    console.log('Message send %s', message.messageId)
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message))
  }
}
