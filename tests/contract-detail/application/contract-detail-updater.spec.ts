import { ContractDetailUpdater } from '../../../src/contract-detail/application/update/contract-detail-updater';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandContractCreator } from '../../../src/contract-detail/application/create/command-creator';
import { CommandContractUpdater } from '../../../src/contract-detail/application/update/command/command-contract-updater';

describe('ContractDetailUpdater', () => {
  const contractUpdater = new ContractDetailUpdater(
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_updater', async () => {
    const dto = ContractDetailCreatorMother.create();
    const response = ContractDetailCreatorMother.createWithTravel();
    dto.id = response.id;
    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractCreator.execute(dto, user.id);

    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(response);
    const expected = await contractUpdater.execute(dto.id, contract, user);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_successfully_contract_updater_called_with', async () => {
    const dto = ContractDetailCreatorMother.create();
    const response = ContractDetailCreatorMother.createWithTravel();
    dto.id = response.id;
    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractCreator.execute(dto, user.id);

    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(response);
    await contractUpdater.execute(dto.id, contract, user);

    const uuid = new Uuid(dto.id);
    const contractUpdate = CommandContractUpdater.execute(
      response,
      contract.toJson(),
    );
    expect(contractDetailRepositoryMock.update).toHaveBeenCalledWith(
      uuid,
      contractUpdate,
    );
  });

  it('should_failed_contract_updater', async () => {
    const dto = ContractDetailCreatorMother.create();
    const response = ContractDetailCreatorMother.createWithTravel();
    dto.id = response.id;
    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractCreator.execute(dto, user.id);

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractDetailRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractUpdater.execute(dto.id, contract, user);
      fail('should_failed_contract_updater');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
