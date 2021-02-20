import { Injectable } from '@nestjs/common'
import fs from 'fs'
import handlebars from 'handlebars'

import { ParseMailTemplateDTO } from '../../../dtos/parse-mail-template.dto'
import { IMailTemplateProvider } from '../email-template.provider'

@Injectable()
export class HandleBarsTemplateProvider implements IMailTemplateProvider {
  async parse(payload: ParseMailTemplateDTO): Promise<string> {
    const { file, variables } = payload

    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8'
    })

    const parseTemplate = handlebars.compile(templateFileContent)

    return parseTemplate(variables)
  }
}
