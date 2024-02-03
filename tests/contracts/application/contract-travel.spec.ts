import { ContractTravelUpdater } from '../../../src/contracts/application/update/travel-updater';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { CommandContractTravel } from '../../../src/contracts/application/update/command/command-travel';
import { ContractTravelMother } from '../domain/contract-travel.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('TravelUpdater', () => {
  const contractTravelUpdater = new ContractTravelUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_travel', async () => {
    const dto = ContractCreatorMother.createWithTravel();
    const travelRequest = ContractTravelMother.create();
    const user = UserCreatorMother.createWithPassword();
    const travel = CommandContractTravel.execute(travelRequest);
    contractRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await contractTravelUpdater.execute(dto.id, travel, user);
    expect(expected.services.travel.airlineReservation).toEqual(
      travelRequest.airlineReservation,
    );
  });

  it('should_failed_contract_travel', async () => {
    const dto = ContractCreatorMother.createWithTravel();
    const travelRequest = ContractTravelMother.create();
    const user = UserCreatorMother.createWithPassword();
    const travel = CommandContractTravel.execute(travelRequest);
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractTravelUpdater.execute(dto.id, travel, user);
      fail('should_failed_contract_travel');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
