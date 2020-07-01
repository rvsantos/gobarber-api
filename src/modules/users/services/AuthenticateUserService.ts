import { sign } from 'jsonwebtoken';
import { inject, injectable } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import authConfig from '@config/auth';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import User from '../infra/typeorm/entities/User';
import IUserRepository from '../repositories/IUsersRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
export default class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  async execute({ email, password }: IRequest): Promise<IResponse> {
    const user = await this.usersRepository.findByEmail(email);

    if (!user) throw new AppError('Incorrect email/password combination.', 401);

    const passwordMatched = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatched)
      throw new AppError('Incorrect email/password combination.', 401);

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return { user, token };
  }
}
