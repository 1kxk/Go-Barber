import { Module } from '@nestjs/common'

import { DiskStorageProvider } from './providers/implementations/disk-storage'
import { StorageService } from './storage.service'

@Module({
  providers: [
    StorageService,
    {
      provide: 'StorageProvider',
      useClass: DiskStorageProvider
    }
  ],
  exports: [StorageService]
})
export class StorageModule {}
