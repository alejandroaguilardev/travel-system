import { CommandContractDocumentation } from '../../../src/contract-detail/application/update/command/command-documentation';
import { ContractDetailDocumentationUpdater } from '../../../src/contract-detail/application/update/documentation-updater';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractDocumentationMother } from '../domain/contract-documentation.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';

describe('ContractDetailDocumentation', () => {
  const contractDocumentation = new ContractDetailDocumentationUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_documentation', async () => {
    const documentationRequest = ContractDocumentationMother.create();
    const contract = ContractCreatorMother.createWithTravel();
    const contractResponse = ContractCreatorMother.createResponse();
    contractResponse.details[0].id = contract.details[0].id;
    contractResponse.details[0].documentation = documentationRequest;

    const user = UserCreatorMother.createWithPassword();
    const documentation =
      CommandContractDocumentation.execute(documentationRequest);

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);

    contractRepositoryMock.searchByIdWithPet.mockResolvedValueOnce(
      contractResponse,
    );

    const expected = await contractDocumentation.execute(
      contract.id,
      contract.details[0].id,
      documentation,
      user,
    );
    expect(
      expected.contractDetail.documentation.chipCertificate.isApplied,
    ).toEqual(documentationRequest.chipCertificate.isApplied);
  });

  it('should_failed_contract_documentation', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const documentationRequest = ContractDocumentationMother.create();
    const user = UserCreatorMother.createWithPassword();
    const documentation =
      CommandContractDocumentation.execute(documentationRequest);

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractDocumentation.execute(
        contract.id,
        contract.details[0].id,
        documentation,
        user,
      );
      fail('should_failed_contract_documentation');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
