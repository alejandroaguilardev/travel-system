import { RoleSearch } from '../../../src/roles/application/search/role-search';
import { roleRepositoryMock } from '../domain/role.repository.mock';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { RoleMother } from '../domain/role-mother';
import { CommandCriteria } from '../../../src/common/application/criteria/command-criteria';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('RoleSearch', () => {
  const roleSearch: RoleSearch = new RoleSearch(roleRepositoryMock);

  it('should_successfully_role_find', async () => {
    const criteriaRequest = CriteriaMother.create();
    const criteria = CommandCriteria.fromData(criteriaRequest);
    const user = UserCreatorMother.createWithPassword();

    const data = [
      RoleMother.create(),
      RoleMother.create(),
      RoleMother.create(),
    ];

    const response = { count: data.length, rows: data };

    roleRepositoryMock.search.mockResolvedValueOnce(response);
    const expected = await roleSearch.execute(criteria, user);
    expect(expected).toEqual(response);
  });

  it('should_successfully_role_find_to_have_call', async () => {
    const criteriaRequest = CriteriaMother.create();
    const criteria = CommandCriteria.fromData(criteriaRequest);
    const user = UserCreatorMother.createWithPassword();

    const data = [
      RoleMother.create(),
      RoleMother.create(),
      RoleMother.create(),
    ];

    const response = { count: data.length, rows: data };

    roleRepositoryMock.search.mockResolvedValueOnce(response);
    await roleSearch.execute(criteria, user);
    expect(roleRepositoryMock.search).toHaveBeenCalledWith(criteria);
  });
});
