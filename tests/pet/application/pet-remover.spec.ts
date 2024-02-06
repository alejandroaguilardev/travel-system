import { PetRemover } from '../../../src/pets/application/remove/pet-remover';
import { petRepositoryMock } from '../domain/pet.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { UuidMother } from '../../common/domain/uuid-mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('PetRemover', () => {
  const petRemover = new PetRemover(petRepositoryMock);

  it('should_successfully_remover_pet', async () => {
    const id = UuidMother.create();
    const expected = await petRemover.execute(id);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });

  it('should_successfully_remover_pet_to_have_called', async () => {
    const id = UuidMother.create();
    await petRemover.execute(id);
    const uuid = new Uuid(id);
    expect(petRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });
});
