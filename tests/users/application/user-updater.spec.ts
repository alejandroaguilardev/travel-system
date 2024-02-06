import { UserUpdater } from '../../../src/users/application/update/user-updater';
import { UserCreatorMother } from '../domain/create-user-mother';
import { userRepositoryMockMethods } from '../domain/user-repository-mock-methods';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { CommandCreatorUser } from '../../../src/users/application/create/command-create-user';

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
    const userAuth = UserCreatorMother.createWithPassword();
    const userUpdate = CommandCreatorUser.execute(
      UserCreatorMother.create(),
      userAuth.id,
    );

    searchByIdMock.mockResolvedValue(userMother);
    updateMock.mockResolvedValue(userMother);

    const resolved = await updateUser.update(
      userMother.id,
      userUpdate,
      userAuth,
    );
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_call_ update_method_of_UserRepository', async () => {
    const userMother = UserCreatorMother.create();
    const userAuth = UserCreatorMother.createWithPassword();
    const userUpdate = CommandCreatorUser.execute(
      UserCreatorMother.create(),
      userAuth.id,
    );

    searchByIdMock.mockResolvedValue(userMother);
    await updateUser.update(userMother.id, userUpdate, userAuth);

    expect(updateMock).toHaveBeenCalledWith(
      new Uuid(userMother.id),
      userUpdate,
    );
  });

  it('should_hable_error_during_user_creation', async () => {
    const userMother = UserCreatorMother.create();
    const userAuth = UserCreatorMother.createWithPassword();
    const userUpdate = CommandCreatorUser.execute(
      UserCreatorMother.create(),
      userAuth.id,
    );

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    updateMock.mockRejectedValue(error);
    try {
      await updateUser.update(userMother.id, userUpdate, userAuth);
      fail('should hable error during user creation');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });
});
