import { SendMailDTO } from '../../dtos/send-email.dto'

export interface IMailProvider {
  sendMail(data: SendMailDTO): Promise<void>
}
