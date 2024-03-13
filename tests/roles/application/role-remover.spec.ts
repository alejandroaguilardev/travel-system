import { RoleRemover } from '../../../src/roles/application/remove/role-remover';
import { roleRepositoryMock } from '../domain/role.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { UuidMother } from '../../common/domain/uuid-mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('RoleRemover', () => {
  const roleRemover = new RoleRemover(roleRepositoryMock);

  it('should_successfully_remover_role', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    const expected = await roleRemover.execute(id, user);
    expect(expected.message).toBe(RoleRemover.messageSuccess());
  });

  it('should_successfully_remover_role_to_have_called', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    await roleRemover.execute(id, user);
    const uuid = new Uuid(id);
    expect(roleRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });
});
