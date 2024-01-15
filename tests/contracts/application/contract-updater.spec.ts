import { ContractUpdater } from '../../../src/contracts/application/update/contract-updater';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { ContractFactory } from '../../../src/contracts/domain/factory/contract.factory';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { NumberMother } from '../domain/number.mother';

describe('ContractUpdater', () => {
  const contractUpdater: ContractUpdater = new ContractUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_updater', async () => {
    const dto = ContractCreatorMother.create();
    const number = NumberMother.create();
    const response = ContractFactory.create(dto);
    contractRepositoryMock.searchById.mockResolvedValueOnce(response.toJson());
    const expected = await contractUpdater.execute(dto.id, { number });
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_successfully_contract_updater_called_with', async () => {
    const dto = ContractCreatorMother.create();
    const number = NumberMother.create();
    const response = ContractFactory.create(dto);
    contractRepositoryMock.searchById.mockResolvedValueOnce(response.toJson());
    await contractUpdater.execute(dto.id, { number });
    const uuid = new Uuid(dto.id);
    const contractUpdate = ContractFactory.update({ number }, response);
    expect(contractRepositoryMock.update).toHaveBeenCalledWith(
      uuid,
      contractUpdate,
    );
  });

  it('should_failed_contract_updater', async () => {
    const dto = ContractCreatorMother.create();
    const number = NumberMother.create();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractUpdater.execute(dto.id, { number });
      fail('should_failed_contract_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
