import AppError from '@shared/errors/AppError';

import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';

let fakeUserRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfile: UpdateProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    updateProfile = new UpdateProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'any_any_name',
      email: 'any_any@email.com',
    });

    expect(updateUser.name).toBe('any_any_name');
    expect(updateUser.email).toBe('any_any@email.com');
  });

  it('should not be able to change to another user email', async () => {
    await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_any@email.com',
      password: 'any_password',
    });

    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'any_any_name',
        email: 'any_any@email.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update password', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    const updateUser = await updateProfile.execute({
      user_id: user.id,
      name: 'any_any_name',
      email: 'any_any@email.com',
      old_password: 'any_password',
      password: 'anyy_password',
    });

    expect(updateUser.password).toBe('anyy_password');
  });

  it('should not be able to update password without correct old_password', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'any_any_name',
        email: 'any_any@email.com',
        old_password: 'any_any_password',
        password: 'anyy_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update password without old_password', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await expect(
      updateProfile.execute({
        user_id: user.id,
        name: 'any_any_name',
        email: 'any_any@email.com',
        password: 'anyy_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile of a non-existent user', async () => {
    await expect(
      updateProfile.execute({
        user_id: '100',
        name: 'any_any_name',
        email: 'any_any@email.com',
        old_password: 'any_any_password',
        password: 'anyy_password',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
