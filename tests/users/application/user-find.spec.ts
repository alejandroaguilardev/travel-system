import { UserFind } from '../../../src/users/application/find/user-find';
import { userRepositoryMockMethods } from '../domain/user-repository-mock-methods';
import { UserCreatorMother } from '../domain/create-user-mother';
import { ErrorInvalidadArgument } from '../../../src/common/domain/errors/error-invalid-argument';

describe('UserFind', () => {
  const searchByIdWithRoleMock = jest.fn();
  let findUser: UserFind;

  beforeEach(() => {
    const userRepositoryMock = {
      ...userRepositoryMockMethods,
      searchByIdWithRole: searchByIdWithRoleMock,
    };
    findUser = new UserFind(userRepositoryMock);
  });

  it('should successfully find user', async () => {
    const userMother = UserCreatorMother.create();
    delete userMother.password;
    searchByIdWithRoleMock.mockResolvedValueOnce(userMother);
    const expected = await findUser.find(userMother.id);
    expect(expected).toEqual(userMother);
  });

  it('should successfully Empty find user', async () => {
    const userMother = UserCreatorMother.create();
    searchByIdWithRoleMock.mockResolvedValue(null);
    await findUser.find(userMother.id);
    expect(null).toEqual(null);
  });

  it('should failed Uuid find user', async () => {
    const error = new ErrorInvalidadArgument(
      `<Uuid> No es un identificador válido <${'1'}>`,
    );
    searchByIdWithRoleMock.mockRejectedValue(error);
    try {
      await findUser.find('1');
      fail('should failed Uuid find user');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });
});
