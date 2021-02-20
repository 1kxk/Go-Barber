import { HandleBarsTemplateProvider } from '../../../../src/shared/modules/mail/providers/mailTemplate/implementations/handlebars-template'
import { MailService } from '../../../../src/shared/modules/mail/mail.service'
import { EtheralMailProvider } from '../../../../src/shared/modules/mail/providers/mail/implementations/etheral-mail'

describe('EtheralMail Provider', () => {
  let sut: MailService
  let etheralMailProvider: EtheralMailProvider
  let handleBars: HandleBarsTemplateProvider

  beforeEach(async () => {
    handleBars = new HandleBarsTemplateProvider()
    etheralMailProvider = new EtheralMailProvider(handleBars)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sut = new MailService(etheralMailProvider)
  })

  it('', async () => {})
})
