import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { PetMother } from '../domain/pet.mother';
import { PetCreator } from '../../../src/pets/application/create/pet-creator';
import { petRepositoryMock } from '../domain/pet.repository.mock';
import { CommandPetCreator } from '../../../src/pets/application/create/command-pet-creator';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('PetCreator', () => {
  const petCreator = new PetCreator(petRepositoryMock);

  it('should_successfully_pet_create', async () => {
    const petDto = PetMother.create();
    const user = UserCreatorMother.createWithPassword();
    const pet = CommandPetCreator.execute(petDto, user.id);
    const expected = await petCreator.create(pet, user);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });
});
