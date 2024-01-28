import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractSearchById } from '../../../src/contracts/application/search-by-id/contract-search-by-id';
import { ContractCreatorMother } from '../domain/contract-creator.mother';

describe('ContractFind', () => {
  const contractSearchById = new ContractSearchById(contractRepositoryMock);

  it('should_successfully_contract_find_id', async () => {
    const dto = ContractCreatorMother.create();
    contractRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await contractSearchById.execute(dto.id);
    expect(expected).toEqual(dto);
  });

  it('should_successfully_contract_find_id_to_have_call', async () => {
    const dto = ContractCreatorMother.create();
    contractRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await contractSearchById.execute(dto.id);
    const uuid = new Uuid(dto.id);
    expect(contractRepositoryMock.searchById).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_contract_find_id', async () => {
    const dto = ContractCreatorMother.create();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractSearchById.execute(dto.id);
      fail('should_failed_contract_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
