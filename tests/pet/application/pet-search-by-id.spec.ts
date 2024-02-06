import { petRepositoryMock } from '../domain/pet.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { PetSearchById } from '../../../src/pets/application/search-by-id/pet-search-by-id';
import { PetMother } from '../domain/pet.mother';

describe('PetFind', () => {
  const petSearchById = new PetSearchById(petRepositoryMock);

  it('should_successfully_pet_find_id', async () => {
    const dto = PetMother.create();
    petRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await petSearchById.execute(dto.id);
    expect(expected).toEqual(dto);
  });

  it('should_successfully_pet_find_id_to_have_call', async () => {
    const dto = PetMother.create();
    petRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await petSearchById.execute(dto.id);
    const uuid = new Uuid(dto.id);
    expect(petRepositoryMock.searchById).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_pet_find_id', async () => {
    const dto = PetMother.create();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    petRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await petSearchById.execute(dto.id);
      fail('should_failed_pet_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
