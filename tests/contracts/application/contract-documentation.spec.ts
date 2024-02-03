import { contractRepositoryMock } from '../domain/contract-mock.repository';
import { ContractCreatorMother } from '../domain/contract-creator.mother';
import { ContractDocumentationUpdater } from '../../../src/contracts/application/update/documentation-updater';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractDocumentationMother } from '../domain/contract-documentation.mother';
import { CommandContractDocumentation } from '../../../src/contracts/application/update/command/command-documentation';
import { UserCreatorMother } from '../../users/domain/create-user-mother';

describe('ContractDocumentation', () => {
  const contractDocumentation = new ContractDocumentationUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_documentation', async () => {
    const dto = ContractCreatorMother.createWithTravel();
    const documentationRequest = ContractDocumentationMother.create();
    const user = UserCreatorMother.createWithPassword();
    const documentation =
      CommandContractDocumentation.execute(documentationRequest);

    contractRepositoryMock.searchById.mockResolvedValueOnce(dto);
    const expected = await contractDocumentation.execute(
      dto.id,
      documentation,
      user,
    );
    expect(expected.services.documentation.chipCertificate.isApplied).toEqual(
      documentationRequest.chipCertificate.isApplied,
    );
  });

  it('should_failed_contract_documentation', async () => {
    const dto = ContractCreatorMother.createWithTravel();
    const documentationRequest = ContractDocumentationMother.create();
    const user = UserCreatorMother.createWithPassword();
    const documentation =
      CommandContractDocumentation.execute(documentationRequest);

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractDocumentation.execute(dto.id, documentation, user);
      fail('should_failed_contract_documentation');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
