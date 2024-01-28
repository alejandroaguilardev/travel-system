import { PermissionFind } from '../../../src/permissions/application/find/permission-find';
import { PermissionMother } from '../domain/permission.mother';
import { permissionRepositoryMethodsMock } from '../domain/permission-repository-methods.mock';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';

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
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    searchByIdMock.mockRejectedValueOnce(error);
    try {
      await permissionFind.find(id);
      fail('should_not_found_user_find_by_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
