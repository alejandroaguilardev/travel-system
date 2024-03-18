import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { ContractFolderUpdater } from '../../../src/contracts/application/update/folder-updater';

describe('ContractFolderUpdater', () => {
  const contractFolderUpdater = new ContractFolderUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_folder', async () => {
    const dto = ContractCreatorMother.createWithTravel();
    const user = UserCreatorMother.createWithPassword();
    contractRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await contractFolderUpdater.execute(
      dto.id,
      {
        folder: dto.folder,
        number: dto.number,
      },
      user,
    );
    expect(expected.message).toBe(ContractFolderUpdater.messageSuccess());
  });
});
