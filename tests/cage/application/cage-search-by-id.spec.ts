import { cageRepositoryMock } from '../domain/cage.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { CageSearchById } from '../../../src/cages/application/search-by-id/cage-search-by-id';
import { CageMother } from '../domain/cage.mother';

describe('CageFind', () => {
  const cageSearchById = new CageSearchById(cageRepositoryMock);

  it('should_successfully_cage_find_id', async () => {
    const dto = CageMother.create();
    cageRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await cageSearchById.execute(dto.id);
    expect(expected).toEqual(dto);
  });

  it('should_successfully_cage_find_id_to_have_call', async () => {
    const dto = CageMother.create();
    cageRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await cageSearchById.execute(dto.id);
    const uuid = new Uuid(dto.id);
    expect(cageRepositoryMock.searchById).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_cage_find_id', async () => {
    const dto = CageMother.create();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    cageRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await cageSearchById.execute(dto.id);
      fail('should_failed_cage_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
