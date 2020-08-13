import AppError from '@shared/errors/AppError';

import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import ShowProfileService from '@modules/users/services/ShowProfileService';

let fakeUserRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUserRepository);
  });

  it('should be able to show profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'any_name',
      email: 'any_email@email.com',
      password: 'any_password',
    });

    const showUserProfile = await showProfile.execute({
      user_id: user.id,
    });

    expect(showUserProfile.name).toBe('any_name');
    expect(showUserProfile.email).toBe('any_email@email.com');
  });

  it('should not be able to show profile from non-existing user', async () => {
    await expect(
      showProfile.execute({
        user_id: '100',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
