import User from '@modules/users/infra/typeorm/entities/User';

import IFindAllProvidersDTO from '@modules/appointments/dtos/IFindAllProviderDTO';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUserRepository {
  findAllProviders(data: IFindAllProvidersDTO): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
}
