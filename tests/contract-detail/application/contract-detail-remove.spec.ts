import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { ContractDetailRemover } from '../../../src/contract-detail/application/remove/contract-detail-remover';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';

describe('ContractDetailRemover', () => {
  const contractRemover = new ContractDetailRemover(contractRepositoryMock);

  it('should_successfully_remover_contract', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const user = UserCreatorMother.createWithPassword();
    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);

    const expected = await contractRemover.execute(
      contract.id,
      contract.details[0].id,
      user,
    );
    expect(expected.message).toBe(ContractDetailRemover.messageSuccess());
  });

  it('should_successfully_remover_contract_to_have_called', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const user = UserCreatorMother.createWithPassword();
    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);

    await contractRemover.execute(contract.id, contract.details[0].id, user);
    expect(contractRepositoryMock.updateDetail).toHaveBeenCalled();
  });
});
