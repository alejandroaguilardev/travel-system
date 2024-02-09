import { UuidMother } from '../../common/domain/uuid-mother';
import { PermissionRemover } from '../../../src/permissions/application/remove/permission-remover';
import { permissionRepositoryMock } from '../domain/permission-repository-methods.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('PermissionRemover', () => {
  const permissionRemover = new PermissionRemover(permissionRepositoryMock);

  it('should_successfully_remove_permission', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    const resolved = await permissionRemover.execute(id, user);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });

  it('should_call_remover_method_of_PermissionRepository', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    await permissionRemover.execute(id, user);
    const uuid = new Uuid(id);
    expect(permissionRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });
});
