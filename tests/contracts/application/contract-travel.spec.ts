import { ContractTravelUpdater } from '../../../src/contracts/application/update/travel-updater';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { ContractFactory } from '../../../src/contracts/domain/factory/contract.factory';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';

describe('TravelUpdater', () => {
  const contractTravelUpdater = new ContractTravelUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_travel', async () => {
    const dto = ContractCreatorMother.createWithTravel();
    const contract = ContractFactory.converter(dto);
    const { id } = dto;
    contractRepositoryMock.searchById.mockResolvedValueOnce(contract.toJson());
    const expected = await contractTravelUpdater.execute(
      id,
      dto.services.travel,
    );
    expect(expected.services.travel.airlineReservation).toEqual(
      contract.toJson().services.travel.airlineReservation,
    );
  });

  it('should_failed_contract_travel', async () => {
    const dto = ContractCreatorMother.createWithTravel();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractTravelUpdater.execute(dto.id, dto.services.travel);
      fail('should_failed_contract_travel');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
