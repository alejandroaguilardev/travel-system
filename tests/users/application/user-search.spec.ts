import { UserSearch } from '../../../src/users/application/search/user-search';
import { userRepositoryMock } from '../domain/user-repository-mock-methods';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { UserCreatorMother } from '../domain/create-user-mother';

describe('findAllUser', () => {
  const findAllUser = new UserSearch(userRepositoryMock);

  it('Should Retrieve All Users', async () => {
    const criteria = CriteriaMother.create({ start: 0, size: 5 });

    const response = [
      UserCreatorMother.create(),
      UserCreatorMother.create(),
      UserCreatorMother.create(),
      UserCreatorMother.create(),
    ];
    const user = UserCreatorMother.createWithPassword();
    userRepositoryMock.search.mockResolvedValueOnce({
      count: response.length,
      response,
    });
    const expected = await findAllUser.execute(criteria, user);

    expect(expected).toEqual({ count: response.length, response });
    expect(expected.count).toEqual(response.length);
  });

  it('Should Retrieve All Users Empty', async () => {
    const criteria = CriteriaMother.create({ start: 0, size: 5 });

    const response = [];
    userRepositoryMock.search.mockResolvedValueOnce(response);
    const user = UserCreatorMother.createWithPassword();
    const expected = await findAllUser.execute(criteria, user);

    expect(expected).toEqual(response);
  });
});
