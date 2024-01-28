import { PermissionCreator } from '../../../src/permissions/application/create/permission-creator';
import { PermissionMother } from '../domain/permission.mother';
import { permissionRepositoryMethodsMock } from '../domain/permission-repository-methods.mock';
import { PermissionFactory } from '../../../src/permissions/domain/permission.factory';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('PermissionCreator', () => {
  const saveMock = jest.fn();
  let permissionCreator: PermissionCreator;

  beforeEach(() => {
    const mockRepository = {
      ...permissionRepositoryMethodsMock,
      save: saveMock,
    };
    permissionCreator = new PermissionCreator(mockRepository);
  });

  it('should_successfully_permission_created', async () => {
    const dto = PermissionMother.create();
    const permission = PermissionFactory.create(dto);
    saveMock.mockResolvedValueOnce(permission);

    const resolved = await permissionCreator.create(dto);
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });

  it('should_call_creator_method_of_PermissionRepository', async () => {
    const dto = PermissionMother.create();
    const permission = PermissionFactory.create(dto);
    saveMock.mockResolvedValueOnce(permission);

    await permissionCreator.create(dto);
    expect(saveMock).toHaveBeenCalledWith(permission);
  });
});
