import { ConfigService } from '@nestjs/config'
import { DiskStorageProvider } from '../../../../src/shared/modules/storage/providers/implementations/disk-storage'
import { StorageService } from '../../../../src/shared/modules/storage/storage.service'

describe('EtheralMail Provider', () => {
  let sut: StorageService
  let diskStorageProvider: DiskStorageProvider
  let configService: ConfigService

  beforeEach(async () => {
    configService = new ConfigService()
    diskStorageProvider = new DiskStorageProvider(configService)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    sut = new StorageService(diskStorageProvider)
  })

  it('', async () => {})
})
