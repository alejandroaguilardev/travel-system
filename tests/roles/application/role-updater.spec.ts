import { RoleUpdater } from '../../../src/roles/application/update/role-updater';
import { RoleMother } from '../domain/role-mother';
import { roleRepositoryMock } from '../domain/role.repository.mock';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandRole } from '../../../src/roles/application/create/command-role';

describe('RoleUpdater', () => {
  const roleUpdater = new RoleUpdater(roleRepositoryMock);

  it('should_successfully_role_updater', async () => {
    const dto = RoleMother.create();
    const role = CommandRole.execute(dto);
    const user = UserCreatorMother.createWithPassword();
    roleRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const response = await roleUpdater.update(dto.id, role, user);
    expect(response.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_successfully_role_updater_called_with', async () => {
    const dto = RoleMother.create();
    const role = CommandRole.execute(dto);
    const user = UserCreatorMother.createWithPassword();
    roleRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await roleUpdater.update(dto.id, role, user);
    const uuid = new Uuid(dto.id);
    expect(roleRepositoryMock.update).toHaveBeenCalledWith(uuid, role);
  });

  it('should_failed_role_updater', async () => {
    const dto = RoleMother.create();
    const role = CommandRole.execute(dto);
    const user = UserCreatorMother.createWithPassword();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    roleRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await roleUpdater.update(dto.id, role, user);
      fail('should_failed_role_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
