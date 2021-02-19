import { registerAs } from '@nestjs/config'
import path from 'path'

export const storageConfig = registerAs('storage', () => ({
  tmpFolder: path.resolve(__dirname, '..', '..', 'tmp'),
  uploadsFolder: path.resolve(__dirname, '..', '..', 'tmp', 'uploads')
}))
