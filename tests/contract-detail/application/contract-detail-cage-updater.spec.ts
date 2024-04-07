import { CommandContractCage } from '../../../src/contract-detail/application/update/command/command-cage';
import { ContractDetailCageUpdater } from '../../../src/contract-detail/application/update/cage-updater';
import { CageMother } from '../domain/cage-mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';

describe('ContractDetailCageUpdater', () => {
  const contractCageUpdater = new ContractDetailCageUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_cage', async () => {
    const cageRequest = CageMother.create();
    const contract = ContractCreatorMother.createWithTravel();
    const contractResponse = ContractCreatorMother.createResponse();
    contractResponse.details[0].id = contract.details[0].id;
    contractResponse.details[0].cage = cageRequest;
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandContractCage.execute(cageRequest);

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);
    contractRepositoryMock.searchByIdWithPet.mockResolvedValueOnce(
      contractResponse,
    );

    const expected = await contractCageUpdater.execute(
      contract.id,
      contract.details[0].id,
      cage,
      user,
    );

    expect(expected.contractDetail.cage.chosen.dimensionsCage).toEqual(
      cageRequest.chosen.dimensionsCage,
    );
  });

  it('should_failed_contract_cage', async () => {
    const cageRequest = CageMother.create();
    const contract = ContractCreatorMother.createWithTravel();
    const contractResponse = ContractCreatorMother.createResponse();
    contractResponse.details[0].id = contract.details[0].id;
    contractResponse.details[0].cage = cageRequest;
    const user = UserCreatorMother.createWithPassword();
    const cage = CommandContractCage.execute(cageRequest);
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractCageUpdater.execute(
        contract.id,
        contract.details[0].id,
        cage,
        user,
      );
      fail('should_failed_contract_cage');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
