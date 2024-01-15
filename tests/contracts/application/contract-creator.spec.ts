import { ContractCreator } from '../../../src/contracts/application/create/contract-creator';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { MessageDefault } from '../../../src/common/domain/response/response-message';

describe('ContractCreator', () => {
  const contractCreator = new ContractCreator(contractRepositoryMock);

  it('should_successfully_contract_creator', async () => {
    const dto = ContractCreatorMother.create();

    const expected = await contractCreator.execute(dto);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_CREATED);
  });
});
