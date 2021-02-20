import { HandleBarsTemplateProvider } from '../../../../../../../src/shared/modules/mail/providers/mailTemplate/implementations/handlebars-template'
import { ParseMailTemplateDTO } from '../../../../../../../src/shared/modules/mail/dtos/parse-mail-template.dto'

function parseTemplateMock(_data) {
  return 'some-value'
}

jest.mock('handlebars', () => ({
  compile: () => parseTemplateMock
}))

jest.mock('fs', () => ({
  promises: {
    readFile: () => 'some-file'
  }
}))

describe('EtheralMail Provider', () => {
  let sut: HandleBarsTemplateProvider

  beforeEach(async () => {
    sut = new HandleBarsTemplateProvider()
  })
  describe('', () => {
    it('Should be able to parse a email template', async () => {
      const requestMock: ParseMailTemplateDTO = {
        file: 'any-file',
        variables: {
          fake: 'fake-value'
        }
      }

      const promise = sut.parse(requestMock)

      await expect(promise).resolves.toEqual('some-value')
    })
  })
})
