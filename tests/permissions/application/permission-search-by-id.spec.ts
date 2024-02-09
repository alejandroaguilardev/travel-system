import { PermissionSearchById } from '../../../src/permissions/application/search-by-id/permission-search-by-id';
import { PermissionMother } from '../domain/permission.mother';
import { permissionRepositoryMock } from '../domain/permission-repository-methods.mock';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('PermissionFind', () => {
  const permissionFind = new PermissionSearchById(permissionRepositoryMock);

  it('should_successfully_user_find_by_id', async () => {
    const response = PermissionMother.create();
    const { id } = response;
    permissionRepositoryMock.searchById.mockResolvedValueOnce(response);
    const user = UserCreatorMother.createWithPassword();
    const expected = await permissionFind.execute(id, user);
    expect(expected).toBe(response);
  });

  it('should_not_found_user_find_by_id', async () => {
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    permissionRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      const response = PermissionMother.create();
      const { id } = response;
      const user = UserCreatorMother.createWithPassword();
      await permissionFind.execute(id, user);
      fail('should_not_found_user_find_by_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
