import { ContractUpdater } from '../../../src/contracts/application/update/contract-updater';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandContractCreator } from '../../../src/contracts/application/create/command-creator';
import { CommandUpdater } from '../../../src/contracts/application/update/command/command-updater';

describe('ContractUpdater', () => {
  const contractUpdater: ContractUpdater = new ContractUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_updater', async () => {
    const dto = ContractCreatorMother.create();
    const response = ContractCreatorMother.createWithTravel();
    dto.id = response.id;
    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractCreator.execute(dto, user.id);

    contractRepositoryMock.searchById.mockResolvedValueOnce(response);
    const expected = await contractUpdater.execute(dto.id, contract, user);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_successfully_contract_updater_called_with', async () => {
    const dto = ContractCreatorMother.create();
    const response = ContractCreatorMother.createWithTravel();
    dto.id = response.id;
    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractCreator.execute(dto, user.id);

    contractRepositoryMock.searchById.mockResolvedValueOnce(response);
    await contractUpdater.execute(dto.id, contract, user);

    const uuid = new Uuid(dto.id);
    const contractUpdate = CommandUpdater.execute(contract.toJson(), response);
    expect(contractRepositoryMock.update).toHaveBeenCalledWith(
      uuid,
      contractUpdate,
    );
  });

  it('should_failed_contract_updater', async () => {
    const dto = ContractCreatorMother.create();
    const response = ContractCreatorMother.createWithTravel();
    dto.id = response.id;
    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractCreator.execute(dto, user.id);

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractUpdater.execute(dto.id, contract, user);
      fail('should_failed_contract_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
