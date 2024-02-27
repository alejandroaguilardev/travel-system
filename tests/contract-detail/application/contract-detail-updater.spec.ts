import { ContractDetailUpdater } from '../../../src/contract-detail/application/update/contract-detail-updater';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { CommandContractDetailCreator } from '../../../src/contract-detail/application/create/command-contract-detail-creator';

describe('ContractDetailUpdater', () => {
  const contractUpdater = new ContractDetailUpdater(
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_updater', async () => {
    const dto = ContractCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    const contractDetail = CommandContractDetailCreator.execute(
      dto.details,
      user.id,
    );

    const contractDetailResponse =
      ContractDetailCreatorMother.createWithTravel();
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(
      contractDetailResponse,
    );

    const expected = await contractUpdater.execute(contractDetail, user);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_UPDATED);
  });

  it('should_successfully_contract_updater_called_with', async () => {
    const dto = ContractCreatorMother.create();
    const response = ContractDetailCreatorMother.createWithTravel();

    const user = UserCreatorMother.createWithPassword();
    const contractDetail = CommandContractDetailCreator.execute(
      dto.details,
      user.id,
    );

    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(response);
    await contractUpdater.execute(contractDetail, user);

    expect(contractDetailRepositoryMock.update).toHaveBeenCalledTimes(2);
  });
});
