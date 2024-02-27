import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractSearchById } from '../../../src/contracts/application/search-by-id/contract-search-by-id';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractDetailRepositoryMock } from '../../contract-detail/domain/contract-detail-mock.repository';

const response = [
  ContractCreatorMother.create(),
  ContractCreatorMother.create(),
  ContractCreatorMother.create(),
  ContractCreatorMother.create(),
];

describe('C', () => {
  const contractSearchById = new ContractSearchById(
    contractRepositoryMock,
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_client_id', async () => {
    const dto = ContractCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    contractRepositoryMock.searchById.mockResolvedValueOnce(response);
    const expected = await contractSearchById.execute(dto.client, user);
    expect(expected).toEqual(dto);
  });

  it('should_successfully_contract_client_id_to_have_call', async () => {
    const dto = ContractCreatorMother.create();
    contractRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const user = UserCreatorMother.createWithPassword();
    await contractSearchById.execute(dto.id, user);
    const uuid = new Uuid(dto.id);
    expect(contractRepositoryMock.searchById).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_contract_client_id', async () => {
    const dto = ContractCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractSearchById.execute(dto.id, user);
      fail('should_failed_contract_client_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
