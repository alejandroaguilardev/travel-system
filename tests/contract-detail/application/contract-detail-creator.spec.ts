import { ContractDetailCreator } from '../../../src/contract-detail/application/create/contract-detail-creator';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandContractCreator } from '../../../src/contract-detail/application/create/command-creator';

describe('ContractDetailCreator', () => {
  const contractCreator = new ContractDetailCreator(
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_creator', async () => {
    const dto = ContractDetailCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractCreator.execute(dto, user.id);

    const expected = await contractCreator.execute(contract, user);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });
});
