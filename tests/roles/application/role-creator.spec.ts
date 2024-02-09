import { RoleCreator } from '../../../src/roles/application/create/role-creator';
import { RoleMother } from '../domain/role-mother';
import { roleRepositoryMock } from '../domain/role.repository.mock';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { CommandRole } from '../../../src/roles/application/create/command-role';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('RoleCreator', () => {
  const roleCreator = new RoleCreator(roleRepositoryMock);

  it('should_successfully_role_save', async () => {
    const dto = RoleMother.create();
    const role = CommandRole.execute(dto);
    const user = UserCreatorMother.createWithPassword();
    const resolved = await roleCreator.execute(role, user);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('should_successfully_role_called_with', async () => {
    const dto = RoleMother.create();
    const role = CommandRole.execute(dto);
    const user = UserCreatorMother.createWithPassword();
    roleRepositoryMock.save.mockResolvedValueOnce(role);
    await roleCreator.execute(role, user);
    expect(roleRepositoryMock.save).toHaveBeenCalledWith(role);
  });
});
