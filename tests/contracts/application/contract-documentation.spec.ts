import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { ContractFactory } from '../../../src/contracts/domain/factory/contract.factory';
import { ContractDocumentationUpdater } from '../../../src/contracts/application/update/documentation-updater';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';

describe('ContractDocumentation', () => {
  const contractDocumentation = new ContractDocumentationUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_documentation', async () => {
    const dto = ContractCreatorMother.create();
    const contract = ContractFactory.create(dto);
    const { id } = dto;
    contractRepositoryMock.searchById.mockResolvedValueOnce(contract.toJson());
    const expected = await contractDocumentation.execute(id, dto.documentation);
    expect(expected.services.documentation.chipCertificate).toEqual(
      contract.toJson().services.documentation.chipCertificate,
    );
  });

  it('should_failed_contract_documentation', async () => {
    const dto = ContractCreatorMother.create();
    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractDocumentation.execute(dto.id, dto.documentation);
      fail('should_failed_contract_documentation');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
