import { Inject, Injectable } from '@nestjs/common'
import { IStorageProvider } from './providers/storage.provider'

@Injectable()
export class StorageService {
  constructor(
    @Inject('StorageProvider')
    private readonly storageProvider: IStorageProvider
  ) {}

  saveFile(filename: string): Promise<string> {
    return this.storageProvider.saveFile(filename)
  }

  deleteFile(filename: string): Promise<void> {
    return this.storageProvider.deleteFile(filename)
  }
}
