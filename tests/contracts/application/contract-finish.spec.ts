import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { ContractFinish } from '../../../src/contracts/application/finish/contract-finish';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('ContractFinish', () => {
  const contractDocumentation = new ContractFinish(contractRepositoryMock);

  it('should_successfully_contract_documentation', async () => {
    const dto = ContractCreatorMother.createWithTravel({ status: 'completed' });

    const { id } = dto;
    contractRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const user = UserCreatorMother.createWithPassword();
    const expected = await contractDocumentation.execute(id, user);
    expect(expected.message).toEqual(ContractFinish.messageSuccess());
  });

  it('should_failed_contract_documentation', async () => {
    const dto = ContractCreatorMother.create();
    const user = UserCreatorMother.createWithPassword();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractDocumentation.execute(dto.id, user);
      fail('should_failed_contract_documentation');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
