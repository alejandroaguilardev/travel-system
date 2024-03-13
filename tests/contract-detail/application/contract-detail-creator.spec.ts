import { ContractDetailCreator } from '../../../src/contract-detail/application/create/contract-detail-creator';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { CommandContractDetailCreator } from '../../../src/contract-detail/application/create/command-contract-detail-creator';

describe('ContractDetailCreator', () => {
  const contractDetailCreator = new ContractDetailCreator(
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_creator', async () => {
    const dto = ContractCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractDetailCreator.execute(dto.details, user.id);

    const expected = await contractDetailCreator.execute(contract, user);
    expect(expected.message).toBe(ContractDetailCreator.messageSuccess());
  });
});
