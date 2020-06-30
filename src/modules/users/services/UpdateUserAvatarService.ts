import { join } from 'path';
import fs from 'fs';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

export default class UpdateUserAvatarService {
  constructor(private usersRepository: IUserRepository) {}

  async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError('Only authenticated uers can change avatar.', 401);

    if (user.avatar) {
      const userAvatarFilePath = join(uploadConfig.directory, user.avatar);
      const userAvatarFileExist = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExist) await fs.promises.unlink(userAvatarFilePath);
    }

    user.avatar = avatarFileName;
    await this.usersRepository.save(user);

    return user;
  }
}
