import { petRepositoryMock } from '../domain/pet.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { PetSearchById } from '../../../src/pets/application/search-by-id/pet-search-by-id';
import { PetMother } from '../domain/pet.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('PetFind', () => {
  const petSearchById = new PetSearchById(petRepositoryMock);

  it('should_successfully_pet_find_id', async () => {
    const dto = PetMother.create();
    const user = UserCreatorMother.createWithPassword();
    petRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await petSearchById.execute(dto.id, user);
    expect(expected).toEqual(dto);
  });

  it('should_successfully_pet_find_id_to_have_call', async () => {
    const dto = PetMother.create();
    const user = UserCreatorMother.createWithPassword();
    petRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await petSearchById.execute(dto.id, user);
    const uuid = new Uuid(dto.id);
    expect(petRepositoryMock.searchById).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_pet_find_id', async () => {
    const dto = PetMother.create();
    const user = UserCreatorMother.createWithPassword();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    petRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await petSearchById.execute(dto.id, user);
      fail('should_failed_pet_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
