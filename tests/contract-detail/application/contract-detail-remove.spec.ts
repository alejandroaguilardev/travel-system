import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { UuidMother } from '../../common/domain/uuid-mother';
import { MessageDefault } from '../../../src/common/domain/response/response-message';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { ContractDetailRemover } from '../../../src/contract-detail/application/remove/contract-detail-remover';

describe('ContractDetailRemover', () => {
  const contractRemover = new ContractDetailRemover(
    contractDetailRepositoryMock,
  );

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
    expect(contractDetailRepositoryMock.remove).toHaveBeenCalledWith(uuid);
  });
});
