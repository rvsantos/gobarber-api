import { getRepository, Repository, Not } from 'typeorm';

import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProviderDTO';

import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '@modules/users/infra/typeorm/entities/User';

export default class UsersRepository implements IUsersRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async create(userData: ICreateUserDTO): Promise<User> {
    const user = this.ormRepository.create(userData);

    await this.ormRepository.save(user);

    return user;
  }

  async save(user: User): Promise<User> {
    return this.ormRepository.save(user);
  }

  async findById(id: string): Promise<User | undefined> {
    return this.ormRepository.findOne(id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.ormRepository.findOne({
      where: { email },
    });
  }

  async findAllProviders({
    except_user_id,
  }: IFindAllProvidersDTO): Promise<User[]> {
    return except_user_id
      ? this.ormRepository.find({
          where: { id: Not(except_user_id) },
          select: ['id', 'name', 'email', 'avatar'],
        })
      : this.ormRepository.find({
          select: ['id', 'name', 'email', 'avatar'],
        });
  }
}
