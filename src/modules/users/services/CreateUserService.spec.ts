import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    const user = await createUser.execute({
      name: 'any_name',
      email: 'email@email.com',
      password: 'any_password',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create a new user with duplicate email', async () => {
    const fakeUserRepository = new FakeUsersRepository();
    const createUser = new CreateUserService(fakeUserRepository);

    await createUser.execute({
      name: 'any_name',
      email: 'email@email.com',
      password: 'any_password',
    });

    expect(
      createUser.execute({
        name: 'any_name',
        email: 'email@email.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
