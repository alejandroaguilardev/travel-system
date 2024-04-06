import { ContractDetailTravelUpdater } from '../../../src/contract-detail/application/update/travel-updater';
import { CommandContractTravel } from '../../../src/contract-detail/application/update/command/command-travel';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractTravelMother } from '../domain/contract-travel.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';

describe('ContractDetailAccompaniedUpdater', () => {
  const contractTravelUpdater = new ContractDetailTravelUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_accompanied', async () => {
    const travelRequest = ContractTravelMother.create();
    const contract = ContractCreatorMother.createWithTravel();
    const contractResponse = ContractCreatorMother.createResponse({
      id: contract.id,
    });
    contractResponse.details[0].id = contract.details[0].id;
    contractResponse.details[0].travel = travelRequest;

    const user = UserCreatorMother.createWithPassword();
    const travel = CommandContractTravel.execute(travelRequest);
    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);

    contractRepositoryMock.searchByIdWithPet.mockResolvedValueOnce(
      contractResponse,
    );

    const expected = await contractTravelUpdater.execute(
      contract.id,
      contract.details[0].id,
      travel,
      user,
    );
    expect(expected.contractDetail.travel.airlineReservation).toEqual(
      travelRequest.airlineReservation,
    );
  });

  it('should_failed_contract_accompanied', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel();
    const travelRequest = ContractTravelMother.create();
    const user = UserCreatorMother.createWithPassword();
    const travel = CommandContractTravel.execute(travelRequest);
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractTravelUpdater.execute(
        contract.id,
        contractDetail.id,
        travel,
        user,
      );
      fail('should_failed_contract_accompanied');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
