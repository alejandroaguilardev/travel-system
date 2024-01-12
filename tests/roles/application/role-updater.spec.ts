import { RoleUpdater } from '../../../src/roles/application/update/role-updater';
import { RoleMother } from '../domain/role-mother';
import { roleRepositoryMock } from '../domain/role.repository.mock';
import { StringMother } from '../../common/domain/string.mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { RoleFactory } from '../../../src/roles/domain/role.factory';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { InvalidArgumentError } from '../../../src/common/domain/value-object/invalid-argument-error';

describe('RoleUpdater', () => {
  const updateMock = jest.fn();
  const searchMockById = jest.fn();
  let roleUpdater: RoleUpdater;

  beforeEach(() => {
    const repositoryMock = {
      ...roleRepositoryMock,
      update: updateMock,
      searchById: searchMockById,
    };
    roleUpdater = new RoleUpdater(repositoryMock);
  });

  it('should_successfully_role_updater', async () => {
    const dto = RoleMother.create();
    const name = StringMother.create({ count: { min: 1, max: 1 } });
    searchMockById.mockResolvedValueOnce(dto);
    const response = await roleUpdater.update(dto.id, { name });
    expect(response.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_successfully_role_updater_called_with', async () => {
    const dto = RoleMother.create();
    const name = StringMother.create({ count: { min: 1, max: 1 } });
    searchMockById.mockResolvedValueOnce(dto);
    await roleUpdater.update(dto.id, { name });
    const uuid = new Uuid(dto.id);
    const roleUpdate = RoleFactory.update({ name }, RoleFactory.create(dto));
    expect(updateMock).toHaveBeenCalledWith(uuid, roleUpdate);
  });

  it('should_failed_role_updater', async () => {
    const dto = RoleMother.create();
    const name = StringMother.create({ count: { min: 1, max: 1 } });
    const error = new InvalidArgumentError(
      'Role no encontrado: El sistema no pudo hallar el permiso especificado',
      400,
      'not_found',
    );
    searchMockById.mockRejectedValueOnce(error);
    try {
      await roleUpdater.update(dto.id, { name });
      fail('should_failed_role_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
