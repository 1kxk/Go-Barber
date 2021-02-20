import { ConfigService } from '@nestjs/config'
import path from 'path'
import fs from 'fs'

import { DiskStorageProvider } from '../../../../../../src/shared/modules/storage/providers/implementations/disk-storage'

const filename = 'test.txt'
const filenameTmpPath = path.resolve(__dirname, 'tmp', filename)
const filenameUploadPath = path.resolve(__dirname, 'tmp', 'uploads', filename)

describe('DiskStorage Provider', () => {
  let sut: DiskStorageProvider
  let configService: ConfigService

  beforeEach(async () => {
    configService = new ConfigService()
    sut = new DiskStorageProvider(configService)
  })

  describe('saveFile()', () => {
    beforeEach(() => {
      fs.writeFileSync(filenameTmpPath, 'any-data')

      jest
        .spyOn(configService, 'get')
        .mockImplementationOnce(() => path.resolve(__dirname, 'tmp'))
        .mockImplementationOnce(() => path.resolve(__dirname, 'tmp', 'uploads'))
    })

    afterEach(async () => {
      try {
        await fs.promises.stat(filenameTmpPath)
        await fs.promises.stat(filenameUploadPath)
        await fs.promises.unlink(filenameTmpPath)
        await fs.promises.unlink(filenameUploadPath)
      } catch (error) {}
    })

    it('Should be able to save a file', async () => {
      await sut.saveFile(filename)

      const fileData = fs.readFileSync(filenameUploadPath)
      expect(fileData).toEqual(Buffer.from('any-data'))
    })

    it('Should be able to return filename', async () => {
      const saveFileSpy = jest.spyOn(sut, 'saveFile')
      await sut.saveFile(filename)

      expect(saveFileSpy).toBeCalledWith('test.txt')
    })
  })

  describe('deleteFile()', () => {
    fs.writeFileSync(filenameTmpPath, 'any-data')

    beforeEach(() => {
      jest
        .spyOn(configService, 'get')
        .mockImplementation(() => path.resolve(__dirname, 'tmp', 'uploads'))
    })

    afterEach(async () => {
      try {
        await fs.promises.stat(filenameTmpPath)
        await fs.promises.stat(filenameUploadPath)
        await fs.promises.unlink(filenameTmpPath)
        await fs.promises.unlink(filenameUploadPath)
      } catch (error) {}
    })

    it('Should be able to delete a file', async () => {
      const promise = sut.deleteFile(filename)

      await expect(promise).resolves.toBeUndefined()
    })
  })
})
