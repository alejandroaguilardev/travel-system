import { UserFinAll } from '../../../src/users/application/find-all/user-find-all';
import { userRepositoryMockMethods } from '../domain/user-repository-mock-methods';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { UserCreatorMother } from '../domain/create-user-mother';

describe('findAllUser', () => {
  const searchMock = jest.fn();
  let findAllUser: UserFinAll;

  beforeEach(() => {
    const userRepositoryMock = {
      ...userRepositoryMockMethods,
      search: searchMock,
    };

    findAllUser = new UserFinAll(userRepositoryMock);
  });

  it('Should Retrieve All Users', async () => {
    const criteria = CriteriaMother.create({ start: 0, size: 5 });

    const response = [
      UserCreatorMother.create(),
      UserCreatorMother.create(),
      UserCreatorMother.create(),
      UserCreatorMother.create(),
    ];
    searchMock.mockResolvedValue({ count: response.length, response });
    const expected = await findAllUser.find(criteria);

    expect(expected).toEqual({ count: response.length, response });
    expect(expected.count).toEqual(response.length);
  });

  it('Should Retrieve All Users Empty', async () => {
    const criteria = CriteriaMother.create({ start: 0, size: 5 });

    const response = [];
    searchMock.mockResolvedValue(response);
    const expected = await findAllUser.find(criteria);

    expect(expected).toEqual(response);
  });
});
