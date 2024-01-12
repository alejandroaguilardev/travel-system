import { RoleCreator } from '../../../src/roles/application/create/role-creator';
import { RoleMother } from '../domain/role-mother';
import { roleRepositoryMock } from '../domain/role.repository.mock';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { RoleFactory } from '../../../src/roles/domain/role.factory';

describe('RoleCreator', () => {
  let roleCreator: RoleCreator;
  const saveMock = jest.fn();

  beforeEach(() => {
    const mockRepository = {
      ...roleRepositoryMock,
      save: saveMock,
    };
    roleCreator = new RoleCreator(mockRepository);
  });

  it('should_successfully_role_save', async () => {
    const dto = RoleMother.create();
    const resolved = await roleCreator.create(dto);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('should_successfully_role_called_with', async () => {
    const dto = RoleMother.create();
    const role = RoleFactory.create(dto);
    saveMock.mockResolvedValueOnce(role);
    await roleCreator.create(dto);
    expect(saveMock).toHaveBeenCalledWith(role);
  });
});
