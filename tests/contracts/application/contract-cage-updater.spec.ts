import { ContractCageUpdater } from '../../../src/contracts/application/update/cage-updater';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { CageMother } from '../domain/cage-mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandContractCage } from '../../../src/contracts/application/update/command/command-cage';

describe('CageUpdater', () => {
  const contractCageUpdater = new ContractCageUpdater(contractRepositoryMock);

  it('should_successfully_contract_cage', async () => {
    const dto = ContractCreatorMother.createWithTravel();
    const cageRequest = CageMother.create();
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandContractCage.execute(cageRequest);

    contractRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await contractCageUpdater.execute(dto.id, cage, user);
    expect(expected.services.cage.chosen.dimensionsCage).toEqual(
      cageRequest.chosen.dimensionsCage,
    );
  });

  it('should_failed_contract_cage', async () => {
    const dto = ContractCreatorMother.createWithTravel();
    const cageRequest = CageMother.create();
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandContractCage.execute(cageRequest);
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractCageUpdater.execute(dto.id, cage, user);
      fail('should_failed_contract_cage');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
