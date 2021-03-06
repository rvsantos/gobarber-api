import fs from 'fs';
import { resolve } from 'path';

import uploadConfig from '@config/upload';
import IStorageProvider from '../models/IStorageProvider';

export default class DiskStorageProvider implements IStorageProvider {
  async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      resolve(uploadConfig.tmpFolder, file),
      resolve(uploadConfig.uploadFolder, file),
    );

    return file;
  }

  async deleteFile(file: string): Promise<void> {
    const filePath = resolve(uploadConfig.uploadFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
