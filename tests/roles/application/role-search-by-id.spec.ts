import { roleRepositoryMock } from '../domain/role.repository.mock';
import { RoleSearchById } from '../../../src/roles/application/search-by-id/role-search-by-id';
import { RoleMother } from '../domain/role-mother';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('RoleFind', () => {
  const roleSearchById = new RoleSearchById(roleRepositoryMock);

  it('should_successfully_role_find_id', async () => {
    const dto = RoleMother.create();
    const user = UserCreatorMother.createWithPassword();
    roleRepositoryMock.searchByIdResponse.mockResolvedValueOnce(dto);
    const expected = await roleSearchById.execute(dto.id, user);
    expect(expected).toEqual(dto);
  });

  it('should_successfully_role_find_id_to_have_call', async () => {
    const dto = RoleMother.create();
    const user = UserCreatorMother.createWithPassword();
    roleRepositoryMock.searchByIdResponse.mockResolvedValueOnce(dto);
    await roleSearchById.execute(dto.id, user);
    const uuid = new Uuid(dto.id);
    expect(roleRepositoryMock.searchByIdResponse).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_role_find_id', async () => {
    const dto = RoleMother.create();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    const user = UserCreatorMother.createWithPassword();
    roleRepositoryMock.searchByIdResponse.mockRejectedValueOnce(error);
    try {
      await roleSearchById.execute(dto.id, user);
      fail('should_failed_role_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
