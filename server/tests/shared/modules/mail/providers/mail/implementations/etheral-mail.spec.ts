import { EtheralMailProvider } from '../../../../../../../src/shared/modules/mail/providers/mail/implementations/etheral-mail'
import { HandleBarsTemplateProvider } from '../../../../../../../src/shared/modules/mail/providers/mailTemplate/implementations/handlebars-template'

describe('EtheralMail Provider', () => {
  let sut: EtheralMailProvider
  let handleBars: HandleBarsTemplateProvider

  beforeEach(async () => {
    handleBars = new HandleBarsTemplateProvider()
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sut = new EtheralMailProvider(handleBars)
  })

  it('', async () => {})
})
