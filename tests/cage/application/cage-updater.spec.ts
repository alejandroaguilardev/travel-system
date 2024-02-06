import { CageUpdater } from '../../../src/cages/application/update/cage-updater';
import { CageMother } from '../domain/cage.mother';
import { cageRepositoryMock } from '../domain/cage.repository.mock';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandCageCreator } from '../../../src/cages/application/create/command-cage-creator';

describe('CageUpdater', () => {
  const cageUpdater: CageUpdater = new CageUpdater(cageRepositoryMock);

  it('should_successfully_cage_updater', async () => {
    const dto = CageMother.create();
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandCageCreator.execute(dto, user.id);

    cageRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await cageUpdater.execute(dto.id, cage, user);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_successfully_cage_updater_called_with', async () => {
    const dto = CageMother.create();
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandCageCreator.execute(dto, user.id);

    cageRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await cageUpdater.execute(dto.id, cage, user);

    const uuid = new Uuid(dto.id);
    expect(cageRepositoryMock.update).toHaveBeenCalledWith(uuid, cage);
  });

  it('should_failed_cage_updater', async () => {
    const dto = CageMother.create();
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandCageCreator.execute(dto, user.id);

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    cageRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await cageUpdater.execute(dto.id, cage, user);
      fail('should_failed_cage_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
