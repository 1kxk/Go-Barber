import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import fs from 'fs'
import path from 'path'

import { IStorageProvider } from '../storage.provider'

@Injectable()
export class DiskStorage implements IStorageProvider {
  constructor(private configService: ConfigService) {}

  async saveFile(filename: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(
        this.configService.get<string>('storage.tmpFolder'),
        filename
      ),
      path.resolve(
        this.configService.get<string>('storage.uploadsFolder'),
        filename
      )
    )

    return filename
  }

  async deleteFile(filename: string): Promise<void> {
    const file =
      this.configService.get<string>('storage.uploadsFolder') + '/' + filename

    try {
      await fs.promises.stat(file)
    } catch (error) {}

    await fs.promises.unlink(file)
  }
}
