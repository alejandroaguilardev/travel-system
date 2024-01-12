import { RoleSearch } from '../../../src/roles/application/search/role-search';
import { roleRepositoryMock } from '../domain/role.repository.mock';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { RoleMother } from '../domain/role-mother';
import { CriteriaFactory } from '../../../src/common/application/criteria/criteria.factory';

describe('RoleSearch', () => {
  const roleSearch: RoleSearch = new RoleSearch(roleRepositoryMock);

  it('should_successfully_role_find', async () => {
    const criteriaRequest = CriteriaMother.create();
    const data = [
      RoleMother.create(),
      RoleMother.create(),
      RoleMother.create(),
    ];

    const response = { count: data.length, rows: data };

    roleRepositoryMock.search.mockResolvedValueOnce(response);
    const expected = await roleSearch.execute(criteriaRequest);
    expect(expected).toEqual(response);
  });

  it('should_successfully_role_find_to_have_call', async () => {
    const criteriaRequest = CriteriaMother.create();
    const data = [
      RoleMother.create(),
      RoleMother.create(),
      RoleMother.create(),
    ];

    const response = { count: data.length, rows: data };

    roleRepositoryMock.search.mockResolvedValueOnce(response);
    await roleSearch.execute(criteriaRequest);
    const criteria = CriteriaFactory.fromData(criteriaRequest);
    expect(roleRepositoryMock.search).toHaveBeenCalledWith(criteria);
  });
});
