import { UserFind } from '../../../src/users/application/find/user-find';
import { userRepositoryMockMethods } from '../domain/user-repository-mock-methods';
import { UserCreatorMother } from '../domain/create-user-mother';
import { InvalidArgumentError } from '../../../src/common/domain/value-object/invalid-argument-error';

describe('UserFind', () => {
  const searchByIdMock = jest.fn();
  let findUser: UserFind;

  beforeEach(() => {
    const userRepositoryMock = {
      ...userRepositoryMockMethods,
      searchById: searchByIdMock,
    };
    findUser = new UserFind(userRepositoryMock);
  });

  it('should successfully find user', async () => {
    const userMother = UserCreatorMother.create();
    searchByIdMock.mockResolvedValue(userMother);
    const expected = await findUser.find(userMother.id);
    delete userMother.password;
    expect(expected).toEqual(userMother);
  });

  it('should successfully Empty find user', async () => {
    const userMother = UserCreatorMother.create();
    searchByIdMock.mockResolvedValue(null);
    await findUser.find(userMother.id);
    expect(null).toEqual(null);
  });

  it('should failed Uuid find user', async () => {
    const error = new InvalidArgumentError(
      `<Uuid> No es un identificador válido <${'1'}>`,
    );
    searchByIdMock.mockRejectedValue(error);
    try {
      await findUser.find('1');
      fail('should failed Uuid find user');
    } catch (thrownError) {
      expect(thrownError.message).toBe(error.message);
    }
  });
});
