import { ParseMailTemplateDTO } from '../../dtos/parse-mail-template.dto'

export interface IMailTemplateProvider {
  parse(data: ParseMailTemplateDTO): Promise<string>
}
