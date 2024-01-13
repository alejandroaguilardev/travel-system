import { roleRepositoryMock } from '../domain/role.repository.mock';
import { RoleSearchById } from '../../../src/roles/application/search-by-id/role-search-by-id';
import { RoleMother } from '../domain/role-mother';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';

describe('RoleFind', () => {
  const searchByIdMock = jest.fn();
  let roleSearchById: RoleSearchById;

  beforeEach(() => {
    const repositoryMock = {
      ...roleRepositoryMock,
      searchById: searchByIdMock,
    };
    roleSearchById = new RoleSearchById(repositoryMock);
  });

  it('should_successfully_role_find_id', async () => {
    const dto = RoleMother.create();
    searchByIdMock.mockResolvedValueOnce(dto);
    const expected = await roleSearchById.execute(dto.id);
    expect(expected).toEqual(dto);
  });

  it('should_successfully_role_find_id_to_have_call', async () => {
    const dto = RoleMother.create();
    searchByIdMock.mockResolvedValueOnce(dto);
    await roleSearchById.execute(dto.id);
    const uuid = new Uuid(dto.id);
    expect(searchByIdMock).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_role_find_id', async () => {
    const dto = RoleMother.create();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    searchByIdMock.mockRejectedValueOnce(error);
    try {
      await roleSearchById.execute(dto.id);
      fail('should_failed_role_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
