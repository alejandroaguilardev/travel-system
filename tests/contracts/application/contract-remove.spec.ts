import { ContractRemover } from '../../../src/contracts/application/remove/contract-remover';
import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { UuidMother } from '../../common/domain/uuid-mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('ContractRemover', () => {
  const contractRemover = new ContractRemover(contractRepositoryMock);

  it('should_successfully_remover_contract', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    const expected = await contractRemover.execute(id, user);
    expect(expected.message).toBe(MessageDefault.SUCCESSFULLY_DELETED);
  });

  it('should_successfully_remover_contract_to_have_called', async () => {
    const id = UuidMother.create();
    const user = UserCreatorMother.createWithPassword();
    await contractRemover.execute(id, user);
    const uuid = new Uuid(id);
    expect(contractRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });
});
