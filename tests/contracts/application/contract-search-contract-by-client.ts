import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractSearchById } from '../../../src/contracts/application/search-by-id/contract-search-by-id';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('ContractSearchClient', () => {
  const contractSearchById = new ContractSearchById(contractRepositoryMock);

  it('should_successfully_contract_client_id', async () => {
    const contractResponse = ContractCreatorMother.createResponse();
    const user = UserCreatorMother.createWithPassword({
      id: contractResponse.client.id,
    });
    contractRepositoryMock.searchByIdWithPet.mockResolvedValueOnce(
      contractResponse,
    );
    const expected = await contractSearchById.execute(
      contractResponse.client.id,
      user,
    );
    expect(expected).toEqual(contractResponse);
  });

  it('should_successfully_contract_client_id_to_have_call', async () => {
    const contractResponse = ContractCreatorMother.createResponse();
    const user = UserCreatorMother.createWithPassword({
      id: contractResponse.client.id,
    });
    contractRepositoryMock.searchByIdWithPet.mockResolvedValueOnce(
      contractResponse,
    );
    await contractSearchById.execute(contractResponse.client.id, user);
    const uuid = new Uuid(contractResponse.client.id);
    expect(contractRepositoryMock.searchByIdWithPet).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_contract_client_id', async () => {
    const contractResponse = ContractCreatorMother.createResponse();
    const user = UserCreatorMother.createWithPassword({
      id: contractResponse.client.id,
    });
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchByIdWithPet.mockRejectedValueOnce(error);
    try {
      await contractSearchById.execute(contractResponse.client.id, user);
      fail('should_failed_contract_client_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
