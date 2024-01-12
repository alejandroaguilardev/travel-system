import { PermissionFind } from '../../../src/permissions/application/find/permission-find';
import { PermissionMother } from '../domain/PermissionMother';
import { permissionRepositoryMethodsMock } from '../domain/permission-repository-methods.mock';
import { InvalidArgumentError } from '../../../src/common/domain/value-object/invalid-argument-error';

describe('PermissionFind', () => {
  const searchByIdMock = jest.fn();
  let permissionFind: PermissionFind;

  beforeEach(() => {
    const permissionRepositoryMock = {
      ...permissionRepositoryMethodsMock,
      searchById: searchByIdMock,
    };
    permissionFind = new PermissionFind(permissionRepositoryMock);
  });

  it('should_successfully_user_find_by_id', async () => {
    const response = PermissionMother.create();
    const { id } = response;
    searchByIdMock.mockResolvedValueOnce(response);
    const expected = await permissionFind.find(id);

    expect(expected).toBe(response);
  });

  it('should_not_found_user_find_by_id', async () => {
    const response = PermissionMother.create();
    const { id } = response;
    const error = new InvalidArgumentError(
      'Permiso no encontrado: El sistema no pudo hallar el permiso especificado',
      400,
      'not_found',
    );
    searchByIdMock.mockRejectedValueOnce(error);
    try {
      await permissionFind.find(id);
      fail('should_not_found_user_find_by_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
