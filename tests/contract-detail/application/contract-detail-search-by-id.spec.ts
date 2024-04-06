import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractDetailSearchById } from '../../../src/contract-detail/application/search-by-id/contract-detail-search-by-id';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';

describe('ContractDetailFind', () => {
  const contractSearchById = new ContractDetailSearchById(
    contractRepositoryMock,
  );

  it('should_successfully_contract_find_id', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const contractResponse = ContractCreatorMother.createResponse({
      id: contract.id,
    });
    const user = UserCreatorMother.createWithPassword();

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);

    contractRepositoryMock.searchByIdWithPet.mockResolvedValueOnce(
      contractResponse,
    );

    const expected = await contractSearchById.execute(
      contract.id,
      contract.details[0].id,
      user,
    );
    expect(expected.id).toEqual(contract.details[0].id);
  });

  it('should_successfully_contract_find_id_to_have_call', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const contractResponse = ContractCreatorMother.createResponse({
      id: contract.id,
    });

    const user = UserCreatorMother.createWithPassword();

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);

    contractRepositoryMock.searchByIdWithPet.mockResolvedValueOnce(
      contractResponse,
    );

    await contractSearchById.execute(contract.id, contract.details[0].id, user);
    expect(contractRepositoryMock.searchById).toHaveBeenCalledWith(
      new Uuid(contract.id),
    );
  });

  it('should_failed_contract_find_id', async () => {
    const contract = ContractCreatorMother.createWithTravel();

    const user = UserCreatorMother.createWithPassword();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractSearchById.execute(
        contract.id,
        contract.details[0].id,
        user,
      );
      fail('should_failed_contract_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
