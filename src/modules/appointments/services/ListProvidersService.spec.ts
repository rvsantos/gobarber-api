import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ListProvidersService from '@modules/appointments/services/ListProvidersService';

let fakeUserRepository: FakeUsersRepository;
let listProviders: ListProvidersService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list all providers', async () => {
    await fakeUserRepository.create({
      name: 'any_name00',
      email: 'any_email00@email.com',
      password: 'any_password',
    });

    await fakeUserRepository.create({
      name: 'any_name01',
      email: 'any_email01@email.com',
      password: 'any_password',
    });

    await fakeUserRepository.create({
      name: 'any_name02',
      email: 'any_email02@email.com',
      password: 'any_password',
    });

    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    const listAllProviders = await listProviders.execute({
      user_id: user.id,
    });

    expect(listAllProviders.length).toEqual(3);
    expect(listAllProviders).not.toContain(user.id);
  });
});
