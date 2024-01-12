import { UserUpdater } from '../../../src/users/application/update/user-updater';
import { UserCreatorMother } from '../domain/create-user-mother';
import { userRepositoryMockMethods } from '../domain/user-repository-mock-methods';
import { UserFactory } from '../../../src/users/domain/user-factory';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { InvalidArgumentError } from '../../../src/common/domain/value-object/invalid-argument-error';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('updateUser', () => {
  const updateMock = jest.fn();
  const searchByIdMock = jest.fn();
  let updateUser: UserUpdater;

  beforeEach(() => {
    const userRepositoryMock = {
      ...userRepositoryMockMethods,
      update: updateMock,
      searchById: searchByIdMock,
    };
    updateUser = new UserUpdater(userRepositoryMock);
  });

  it('should_successfully_updated_user', async () => {
    const userMother = UserCreatorMother.create();
    const { id, ...rest } = userMother;

    searchByIdMock.mockResolvedValue(userMother);
    const userResolve = UserFactory.create(userMother);

    const userUpdateResolve = UserFactory.update(
      { ...rest, name: 'pedro' },
      userResolve,
    );
    updateMock.mockResolvedValue(userUpdateResolve);

    const resolved = await updateUser.update(id, { name: 'pedro' });
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_call_ update_method_of_UserRepository', async () => {
    const userMother = UserCreatorMother.create();
    const { id, ...rest } = userMother;

    searchByIdMock.mockResolvedValue(userMother);
    const userResolve = UserFactory.create(userMother);

    const userUpdateResolve = UserFactory.update(
      { ...rest, name: 'pedro' },
      userResolve,
    );
    updateMock.mockResolvedValue(userUpdateResolve);

    await updateUser.update(id, { name: 'pedro' });
    expect(updateMock).toHaveBeenCalledWith(
      new Uuid(id),
      UserFactory.update({ ...rest, name: 'pedro' }, userResolve),
    );
  });

  it('should_hable_error_during_user_creation', async () => {
    const userMother = UserCreatorMother.create();
    const { id } = userMother;

    const error = new InvalidArgumentError('El usuario no existe');
    updateMock.mockRejectedValue(error);
    try {
      await updateUser.update(id, { name: 'pedro' });
      fail('should hable error during user creation');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });
});
