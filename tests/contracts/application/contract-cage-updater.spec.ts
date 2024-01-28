import { ContractCageUpdater } from '../../../src/contracts/application/update/cage-updater';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { ContractFactory } from '../../../src/contracts/domain/factory/contract.factory';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';

describe('CageUpdater', () => {
  const contractCageUpdater = new ContractCageUpdater(contractRepositoryMock);

  it('should_successfully_contract_cage', async () => {
    const dto = ContractCreatorMother.create();
    const contract = ContractFactory.create(dto);
    const { id } = dto;
    contractRepositoryMock.searchById.mockResolvedValueOnce(contract.toJson());
    const expected = await contractCageUpdater.execute(id, dto.cage);
    expect(expected.services.cage.chosen).toEqual(
      contract.toJson().services.cage.chosen,
    );
  });

  it('should_failed_contract_cage', async () => {
    const dto = ContractCreatorMother.create();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractCageUpdater.execute(dto.id, dto.cage);
      fail('should_failed_contract_cage');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
