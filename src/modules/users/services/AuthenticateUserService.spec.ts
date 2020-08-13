import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUser: AuthenticateUserService;
let createUser: CreateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    authenticateUser = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
    createUser = new CreateUserService(fakeUserRepository, fakeHashProvider);
  });

  it('should be able to authenticated', async () => {
    const user = await createUser.execute({
      name: 'any_name',
      email: 'email@email.com',
      password: 'any_password',
    });

    const response = await authenticateUser.execute({
      email: 'email@email.com',
      password: 'any_password',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticated without valid email', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'email2@email.com',
      password: 'any_password',
    });

    await expect(
      authenticateUser.execute({
        email: 'email@email.com',
        password: 'any_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticated if password does not matched', async () => {
    await createUser.execute({
      name: 'any_name',
      email: 'email@email.com',
      password: 'any_password',
    });

    await expect(
      authenticateUser.execute({
        email: 'email@email.com',
        password: 'anypassword',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
