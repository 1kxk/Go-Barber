import { Module } from '@nestjs/common'

import { MailService } from './mail.service'
import { EtheralMailProvider } from './providers/mail/implementations/etheral-mail'
import { HandleBarsTemplateProvider } from './providers/mailTemplate/implementations/handlebars-template'

@Module({
  providers: [
    MailService,
    {
      provide: 'MailProvider',
      useClass: EtheralMailProvider
    },
    {
      provide: 'MailTemplateProvider',
      useClass: HandleBarsTemplateProvider
    }
  ],
  exports: [MailService]
})
export class MailModule {}
