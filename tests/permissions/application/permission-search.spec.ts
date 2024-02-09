import { PermissionSearch } from '../../../src/permissions/application/search/permission-search';
import { PermissionMother } from '../domain/permission.mother';
import { permissionRepositoryMock } from '../domain/permission-repository-methods.mock';
import { CriteriaMother } from '../../common/domain/criteria-mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandCriteria } from '../../../src/common/application/criteria/command-criteria';

describe('PermissionFindAll', () => {
  const findAllPermission = new PermissionSearch(permissionRepositoryMock);

  it('should successfully search permissions', async () => {
    const criteriaMother = CriteriaMother.create({ start: 0, size: 5 });
    const response = [
      PermissionMother.create({ name: 'crear' }),
      PermissionMother.create(),
      PermissionMother.create(),
    ];
    permissionRepositoryMock.search.mockResolvedValueOnce({
      count: response.length,
      response,
    });

    const criteria = CommandCriteria.fromData(criteriaMother);
    const user = UserCreatorMother.createWithPassword();
    const expected = await findAllPermission.execute(criteria, user);
    expect(expected).toEqual({ count: response.length, response });
    expect(expected.count).toEqual(response.length);
  });
});
