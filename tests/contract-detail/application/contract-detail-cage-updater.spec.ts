import { CommandContractCage } from '../../../src/contract-detail/application/update/command/command-cage';
import { ContractDetailCageUpdater } from '../../../src/contract-detail/application/update/cage-updater';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { CageMother } from '../domain/cage-mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';

describe('ContractDetailCageUpdater', () => {
  const contractCageUpdater = new ContractDetailCageUpdater(
    contractRepositoryMock,
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_cage', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel();
    const cageRequest = CageMother.create();
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandContractCage.execute(cageRequest);

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(
      contractDetail,
    );
    const expected = await contractCageUpdater.execute(
      contract.id,
      contractDetail.id,
      cage,
      user,
    );
    expect(expected.contractDetail.cage.chosen.dimensionsCage).toEqual(
      cageRequest.chosen.dimensionsCage,
    );
  });

  it('should_failed_contract_cage', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel();
    const cageRequest = CageMother.create();
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandContractCage.execute(cageRequest);
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractDetailRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractCageUpdater.execute(
        contract.id,
        contractDetail.id,
        cage,
        user,
      );
      fail('should_failed_contract_cage');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
