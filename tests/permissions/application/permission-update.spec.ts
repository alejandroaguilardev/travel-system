import { PermissionUpdater } from '../../../src/permissions/application/updated/permission-updater';
import { permissionRepositoryMethodsMock } from '../domain/permission-repository-methods.mock';
import { StringMother } from '../../common/domain/string.mother';
import { PermissionMother } from '../domain/PermissionMother';
import { PermissionFactory } from '../../../src/permissions/domain/permission.factory';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { InvalidArgumentError } from '../../../src/common/domain/value-object/invalid-argument-error';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('PermissionUpdate', () => {
  const updateMock = jest.fn();
  const searchByIdMock = jest.fn();
  let permissionUpdater: PermissionUpdater;

  beforeEach(() => {
    const permissionRepositoryMock = {
      ...permissionRepositoryMethodsMock,
      update: updateMock,
      searchById: searchByIdMock,
    };
    permissionUpdater = new PermissionUpdater(permissionRepositoryMock);
  });

  it('should_successfully_permission_updater', async () => {
    const name = StringMother.create({ count: { min: 1, max: 1 } });
    const dto = PermissionMother.create();
    searchByIdMock.mockResolvedValueOnce(dto);
    const resolved = await permissionUpdater.update(dto.id, { name });
    expect(resolved.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_call_updater_method_of_PermissionRepository', async () => {
    const name = StringMother.create({ count: { min: 1, max: 1 } });
    const dto = PermissionMother.create();
    const uuid = new Uuid(dto.id);
    searchByIdMock.mockResolvedValueOnce(dto);

    await permissionUpdater.update(dto.id, { name });

    const permission = PermissionFactory.update(
      { name },
      PermissionFactory.create(dto),
    );
    expect(updateMock).toHaveBeenCalledWith(uuid, permission);
  });

  it('should_failed_permission_updater', async () => {
    const name = StringMother.create({ count: { min: 1, max: 1 } });
    const dto = PermissionMother.create();
    const error = new InvalidArgumentError(
      'Permiso no encontrado: El sistema no pudo hallar el permiso especificado',
      400,
      'not_found',
    );
    searchByIdMock.mockRejectedValueOnce(error);
    try {
      await permissionUpdater.update(dto.id, { name });
      fail('should_failed_permission_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
