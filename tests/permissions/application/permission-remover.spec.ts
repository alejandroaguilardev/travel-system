import { UuidMother } from '../../common/domain/uuid-mother';
import { PermissionRemover } from '../../../src/permissions/application/remove/permission-remover';
import { permissionRepositoryMethodsMock } from '../domain/permission-repository-methods.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('PermissionRemover', () => {
  const removeMock = jest.fn();
  let permissionRemover: PermissionRemover;

  beforeEach(() => {
    const permissionRepositoryMock = {
      ...permissionRepositoryMethodsMock,
      remove: removeMock,
    };
    permissionRemover = new PermissionRemover(permissionRepositoryMock);
  });

  it('should_successfully_remove_permission', async () => {
    const id = UuidMother.create();
    const resolved = await permissionRemover.remove(id);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });

  it('should_call_remover_method_of_PermissionRepository', async () => {
    const id = UuidMother.create();
    await permissionRemover.remove(id);
    const uuid = new Uuid(id);
    expect(removeMock).toHaveBeenCalledWith(uuid);
  });
});
