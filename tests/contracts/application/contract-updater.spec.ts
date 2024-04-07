import { ContractUpdater } from '../../../src/contracts/application/update/contract-updater';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandContractCreator } from '../../../src/contracts/application/create/command-creator';

describe('ContractUpdater', () => {
  const contractUpdater: ContractUpdater = new ContractUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_updater', async () => {
    const contractDto = ContractCreatorMother.createWithTravel();
    const contractSearch = ContractCreatorMother.createWithTravel();

    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractCreator.execute(contractDto, user.id);

    contractRepositoryMock.searchById.mockResolvedValueOnce(contractSearch);
    const expected = await contractUpdater.execute(
      contractDto.id,
      contract,
      user,
    );
    expect(expected.message).toBe(ContractUpdater.messageSuccess());
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

    expect(contractRepositoryMock.update).toHaveBeenCalledWith(uuid, contract);
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
