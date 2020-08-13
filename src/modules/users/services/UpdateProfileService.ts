import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import IHashProvider from '@modules/users/providers/HashProvider/models/IHashProvider';
import User from '@modules/users/infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    /*
     * Check if user exist.
     * */
    const user = await this.usersRepository.findById(user_id);

    if (!user) throw new AppError('User not found!');

    /*
     * Check if email already in user.
     */
    const existingUser = await this.usersRepository.findByEmail(email);

    if (existingUser && existingUser.id !== user_id)
      throw new AppError('Email already in use.');

    /*
     * Check if password has passed and old_password has not been passed.
     */
    if (password && !old_password)
      throw new AppError(
        'You need to inform the old password to set a new password',
      );

    /*
     * Check that the old_password has been passed and compared to the user password.
     */
    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) throw new AppError('Password does not match.');

      user.password = await this.hashProvider.generateHash(password);
    }

    /*
     * Updating user profile.
     */
    user.email = email;
    user.name = name;

    return this.usersRepository.save(user);
  }
}
