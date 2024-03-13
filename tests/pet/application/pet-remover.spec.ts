import { PetRemover } from '../../../src/pets/application/remove/pet-remover';
import { petRepositoryMock } from '../domain/pet.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { UuidMother } from '../../common/domain/uuid-mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('PetRemover', () => {
  const petRemover = new PetRemover(petRepositoryMock);

  it('should_successfully_remover_pet', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    const expected = await petRemover.execute(id, user);
    expect(expected.message).toBe(PetRemover.messageSuccess());
  });

  it('should_successfully_remover_pet_to_have_called', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    await petRemover.execute(id, user);
    const uuid = new Uuid(id);
    expect(petRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });
});
