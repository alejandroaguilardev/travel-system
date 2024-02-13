import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { Uuid } from '../../../src/common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractDetailSearchById } from '../../../src/contract-detail/application/search-by-id/contract-detail-search-by-id';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('ContractDetailFind', () => {
  const contractSearchById = new ContractDetailSearchById(
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_find_id', async () => {
    const dto = ContractDetailCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await contractSearchById.execute(dto.id, user);
    expect(expected).toEqual(dto);
  });

  it('should_successfully_contract_find_id_to_have_call', async () => {
    const dto = ContractDetailCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(dto);
    await contractSearchById.execute(dto.id, user);
    const uuid = new Uuid(dto.id);
    expect(contractDetailRepositoryMock.searchById).toHaveBeenCalledWith(uuid);
  });

  it('should_failed_contract_find_id', async () => {
    const dto = ContractDetailCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractDetailRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractSearchById.execute(dto.id, user);
      fail('should_failed_contract_find_id');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
