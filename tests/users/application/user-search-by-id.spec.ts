import { UserSearchById } from '../../../src/users/application/search-by-id/user-search-by-id';
import { userRepositoryMock } from '../domain/user-repository-mock-methods';
import { UserCreatorMother } from '../domain/create-user-mother';
import { ErrorInvalidadArgument } from '../../../src/common/domain/errors/error-invalid-argument';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';

describe('UserFind', () => {
  const findUser = new UserSearchById(userRepositoryMock);

  it('should successfully find user', async () => {
    const userMother = UserCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    userRepositoryMock.searchByIdWithRole.mockResolvedValueOnce(userMother);
    const expected = await findUser.execute(userMother.id, user);
    expect(expected).toEqual(userMother);
  });

  it('should  Empty find user', async () => {
    const error = new ErrorNotFound(ErrorNotFound.messageDefault('usuario'));
    const userMother = UserCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    userRepositoryMock.searchByIdWithRole.mockRejectedValue(error);
    try {
      await findUser.execute(userMother.id, user);
      fail('should failed Uuid find user');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });

  it('should failed Uuid find user', async () => {
    const error = new ErrorInvalidadArgument(
      `<Uuid> No es un identificador válido <${'1'}>`,
    );
    userRepositoryMock.searchByIdWithRole.mockRejectedValue(error);
    const user = UserCreatorMother.createWithPassword();
    try {
      await findUser.execute('1', user);
      fail('should failed Uuid find user');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });
});
