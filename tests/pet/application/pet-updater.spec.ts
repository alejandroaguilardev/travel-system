import { PetUpdater } from '../../../src/pets/application/update/pet-updater';
import { PetMother } from '../domain/pet.mother';
import { petRepositoryMock } from '../domain/pet.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandPetCreator } from '../../../src/pets/application/create/command-pet-creator';

describe('PetUpdater', () => {
  const petUpdater: PetUpdater = new PetUpdater(petRepositoryMock);

  it('should_successfully_pet_updater', async () => {
    const dto = PetMother.create();
    const user = UserCreatorMother.createWithPassword();
    const pet = CommandPetCreator.execute(dto, user.id);

    petRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await petUpdater.execute(dto.id, pet, user);
    expect(expected.message).toBe(PetUpdater.messageSuccess());
  });

  it('should_successfully_pet_updater_called_with', async () => {
    const dto = PetMother.create();
    const user = UserCreatorMother.createWithPassword();
    const pet = CommandPetCreator.execute(dto, user.id);

    petRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await petUpdater.execute(dto.id, pet, user);

    const uuid = new Uuid(dto.id);
    expect(petRepositoryMock.update).toHaveBeenCalledWith(uuid, pet);
  });

  it('should_failed_pet_updater', async () => {
    const dto = PetMother.create();
    const user = UserCreatorMother.createWithPassword();
    const pet = CommandPetCreator.execute(dto, user.id);

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    petRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await petUpdater.execute(dto.id, pet, user);
      fail('should_failed_pet_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
