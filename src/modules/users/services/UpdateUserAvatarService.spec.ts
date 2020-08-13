import AppError from '@shared/errors/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageAvatar';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

let fakeUserRepository: FakeUsersRepository;
let fakeStorageProvider: FakeStorageProvider;
let updateUserAvatar: UpdateUserAvatarService;

describe('UpdateUserAvatar', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    fakeStorageProvider = new FakeStorageProvider();
    updateUserAvatar = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should be able to update avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'any_avatar.png',
    });

    expect(user.avatar).toBe('any_avatar.png');
  });

  it('should not be able to update avatar from non existing user', async () => {
    await expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'any_avatar.png',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to delete the old avatar when updating new one', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'any_avatar.png',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'new_any_avatar.png',
    });

    expect(deleteFile).toHaveBeenCalledWith('any_avatar.png');
    expect(user.avatar).toBe('new_any_avatar.png');
  });
});
