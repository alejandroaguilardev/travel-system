import { PermissionFindAll } from '../../../src/permissions/application/find-all/permission-find-all';
import { PermissionMother } from '../domain/permission.mother';
import { permissionRepositoryMethodsMock } from '../domain/permission-repository-methods.mock';
import { CriteriaMother } from '../../common/domain/criteria-mother';

describe('PermissionFindAll', () => {
  const searchMock = jest.fn();
  let findAllPermission: PermissionFindAll;

  beforeEach(() => {
    const permissionRepositoryMock = {
      ...permissionRepositoryMethodsMock,
      search: searchMock,
    };
    findAllPermission = new PermissionFindAll(permissionRepositoryMock);
  });

  it('should successfully search permissions', async () => {
    const criteria = CriteriaMother.create({ start: 0, size: 5 });
    const response = [
      PermissionMother.create({ name: 'crear' }),
      PermissionMother.create(),
      PermissionMother.create(),
    ];
    searchMock.mockResolvedValueOnce({ count: response.length, response });
    const expected = await findAllPermission.find(criteria);
    expect(expected).toEqual({ count: response.length, response });
    expect(expected.count).toEqual(response.length);
  });
});
