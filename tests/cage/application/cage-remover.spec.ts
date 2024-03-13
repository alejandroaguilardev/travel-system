import { CageRemover } from '../../../src/cages/application/remove/cage-remover';
import { cageRepositoryMock } from '../domain/cage.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { UuidMother } from '../../common/domain/uuid-mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('CageRemover', () => {
  const cageRemover = new CageRemover(cageRepositoryMock);

  it('should_successfully_remover_cage', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    const expected = await cageRemover.execute(id, user);
    expect(expected.message).toBe(CageRemover.messageSuccess());
  });

  it('should_successfully_remover_cage_to_have_called', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    await cageRemover.execute(id, user);
    const uuid = new Uuid(id);
    expect(cageRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });
});
