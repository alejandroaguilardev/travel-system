import { ContractDetailTravelUpdater } from '../../../src/contract-detail/application/update/travel-updater';
import { CommandContractTravel } from '../../../src/contract-detail/application/update/command/command-travel';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractTravelMother } from '../domain/contract-travel.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';

describe('ContractDetailTravelUpdater', () => {
  const contractTravelUpdater = new ContractDetailTravelUpdater(
    contractRepositoryMock,
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_travel', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel();
    const travelRequest = ContractTravelMother.create();
    const user = UserCreatorMother.createWithPassword();
    const travel = CommandContractTravel.execute(travelRequest);
    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(
      contractDetail,
    );
    const expected = await contractTravelUpdater.execute(
      contract.id,
      contractDetail.id,
      travel,
      user,
    );
    expect(expected.contractDetail.travel.airlineReservation).toEqual(
      travelRequest.airlineReservation,
    );
  });

  it('should_failed_contract_travel', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel();
    const travelRequest = ContractTravelMother.create();
    const user = UserCreatorMother.createWithPassword();
    const travel = CommandContractTravel.execute(travelRequest);
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractDetailRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractTravelUpdater.execute(
        contract.id,
        contractDetail.id,
        travel,
        user,
      );
      fail('should_failed_contract_travel');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
