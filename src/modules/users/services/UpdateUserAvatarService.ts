import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserRepository from '../repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatarFileName: string;
}

@injectable()
export default class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  async execute({ user_id, avatarFileName }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user)
      throw new AppError('Only authenticated uers can change avatar.', 401);

    if (user.avatar) await this.storageProvider.deleteFile(user.avatar);

    const filename = await this.storageProvider.saveFile(avatarFileName);

    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;
  }
}
