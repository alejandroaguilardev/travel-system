import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { CageMother } from '../domain/cage.mother';
import { CageCreator } from '../../../src/cages/application/create/cage-creator';
import { cageRepositoryMock } from '../domain/cage.repository.mock';
import { CommandCageCreator } from '../../../src/cages/application/create/command-cage-creator';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('CageCreator', () => {
  const cageCreator = new CageCreator(cageRepositoryMock);

  it('should_successfully_cage_create', async () => {
    const cageDto = CageMother.create();
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandCageCreator.execute(cageDto, user.id);
    const expected = await cageCreator.create(cage, user);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });
});
