import { ParseMailTemplateDTO } from './parse-mail-template.dto'

export class MailContact {
  name: string
  email: string
}

export class SendMailDTO {
  to: MailContact
  from?: MailContact
  subject: string
  templateData: ParseMailTemplateDTO
}
