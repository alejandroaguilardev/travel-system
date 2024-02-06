import { CageRemover } from '../../../src/cages/application/remove/cage-remover';
import { cageRepositoryMock } from '../domain/cage.repository.mock';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { UuidMother } from '../../common/domain/uuid-mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('CageRemover', () => {
  const cageRemover = new CageRemover(cageRepositoryMock);

  it('should_successfully_remover_cage', async () => {
    const id = UuidMother.create();
    const expected = await cageRemover.execute(id);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });

  it('should_successfully_remover_cage_to_have_called', async () => {
    const id = UuidMother.create();
    await cageRemover.execute(id);
    const uuid = new Uuid(id);
    expect(cageRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });
});
