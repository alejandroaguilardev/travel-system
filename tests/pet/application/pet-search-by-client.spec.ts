import { petRepositoryMock } from '../domain/pet.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { PetMother } from '../domain/pet.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { PetSearchByClient } from '../../../src/pets/application/search-by-id/pet-client-search';

describe('PetFind', () => {
  const petSearchByClient = new PetSearchByClient(petRepositoryMock);

  it('should_successfully_pet_find_id', async () => {
    const pet = PetMother.create();
    const { id, name, chip, adopter } = pet;
    const user = UserCreatorMother.createWithPassword();
    petRepositoryMock.searchByClient.mockResolvedValueOnce([{ id, name, chip }]);
    const expected = await petSearchByClient.execute(adopter, user);
    expect(expected).toEqual([{ id, name, chip }]);
  });

  it('should_successfully_pet_find_id_to_have_call', async () => {
    const pet = PetMother.create();
    const { id, name, chip, adopter } = pet;

    const user = UserCreatorMother.createWithPassword();
    petRepositoryMock.searchByClient.mockResolvedValueOnce([{ id, name, chip }]);
    const uuid = new Uuid(adopter);
    await petSearchByClient.execute(adopter, user);
    expect(petRepositoryMock.searchByClient).toHaveBeenCalledWith(uuid);
  });

});
