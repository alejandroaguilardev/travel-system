import { ContractCreator } from '../../../src/contracts/application/create/contract-creator';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { CommandContractCreator } from '../../../src/contracts/application/create/command.creator';

describe('ContractCreator', () => {
  const contractCreator = new ContractCreator(contractRepositoryMock);

  it('should_successfully_contract_creator', async () => {
    const dto = ContractCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    const contract = CommandContractCreator.execute(dto, user.id);

    const expected = await contractCreator.execute(contract, user);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });
});
