import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;

describe('CreateUserService', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to create a new user', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      email: 'email@email.com',
      password: 'any_password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with duplicate email', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'email@email.com',
      password: 'any_password',
    });

    await expect(
      createUser.execute({
        name: 'any_name',
        email: 'email@email.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
