import { PermissionCreator } from '../../../src/permissions/application/create/permission-creator';
import { PermissionMother } from '../domain/permission.mother';
import { permissionRepositoryMock } from '../domain/permission-repository-methods.mock';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandPermissionCreate } from '../../../src/permissions/application/create/command-create-permission';

describe('PermissionCreator', () => {
  const permissionCreator = new PermissionCreator(permissionRepositoryMock);

  it('should_successfully_permission_created', async () => {
    const dto = PermissionMother.create();
    const user = UserCreatorMother.createWithPassword();
    const permission = CommandPermissionCreate.execute(dto);
    const resolved = await permissionCreator.execute(permission, user);
    expect(resolved.message).toBe(PermissionCreator.messageSuccess());
  });

  it('should_call_creator_method_of_PermissionRepository', async () => {
    const dto = PermissionMother.create();
    const permission = CommandPermissionCreate.execute(dto);
    const user = UserCreatorMother.createWithPassword();
    permissionRepositoryMock.save.mockResolvedValueOnce(permission);

    await permissionCreator.execute(permission, user);
    expect(permissionRepositoryMock.save).toHaveBeenCalledWith(permission);
  });
});
