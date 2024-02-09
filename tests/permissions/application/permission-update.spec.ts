import { PermissionUpdater } from '../../../src/permissions/application/updated/permission-updater';
import { permissionRepositoryMock } from '../domain/permission-repository-methods.mock';
import { PermissionMother } from '../domain/permission.mother';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandPermissionCreate } from '../../../src/permissions/application/create/command-create-permission';

describe('PermissionUpdate', () => {
  const permissionUpdater = new PermissionUpdater(permissionRepositoryMock);

  it('should_successfully_permission_updater', async () => {
    const dto = PermissionMother.create();
    const dtoUpdate = PermissionMother.create();
    const user = UserCreatorMother.createWithPassword();
    const permission = CommandPermissionCreate.execute(dtoUpdate);
    permissionRepositoryMock.searchById.mockResolvedValueOnce(dto);

    const resolved = await permissionUpdater.execute(dto.id, permission, user);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_call_updater_method_of_PermissionRepository', async () => {
    const dto = PermissionMother.create();
    const dtoUpdate = PermissionMother.create();
    const user = UserCreatorMother.createWithPassword();
    const permission = CommandPermissionCreate.execute(dtoUpdate);
    permissionRepositoryMock.searchById.mockResolvedValueOnce(dto);

    await permissionUpdater.execute(dto.id, permission, user);

    const uuid = new Uuid(dto.id);
    expect(permissionRepositoryMock.update).toHaveBeenCalledWith(
      uuid,
      permission,
    );
  });

  it('should_failed_permission_updater', async () => {
    const dto = PermissionMother.create();
    const dtoUpdate = PermissionMother.create();
    const user = UserCreatorMother.createWithPassword();
    const permission = CommandPermissionCreate.execute(dtoUpdate);
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    permissionRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await permissionUpdater.execute(dto.id, permission, user);
      fail('should_failed_permission_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
