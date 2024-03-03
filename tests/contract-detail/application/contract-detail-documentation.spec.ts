import { CommandContractDocumentation } from '../../../src/contract-detail/application/update/command/command-documentation';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { ContractDetailDocumentationUpdater } from '../../../src/contract-detail/application/update/documentation-updater';
import { ErrorNotFound } from '../../../src/common/domain/errors/error-not-found';
import { ContractDocumentationMother } from '../domain/contract-documentation.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { PetMother } from '../../pet/domain/pet.mother';

describe('ContractDetailDocumentation', () => {
  const contractDocumentation = new ContractDetailDocumentationUpdater(
    contractRepositoryMock,
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_documentation', async () => {
    const pet = PetMother.createPetInterface();
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel({
      pet: pet.id,
    });

    const documentationRequest = ContractDocumentationMother.create();
    const user = UserCreatorMother.createWithPassword();
    const documentation =
      CommandContractDocumentation.execute(documentationRequest);

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(
      contractDetail,
    );

    contractDetailRepositoryMock.searchByIdWithPet.mockResolvedValueOnce({
      ...contractDetail,
      pet,
    });

    const expected = await contractDocumentation.execute(
      contract.id,
      contractDetail.id,
      documentation,
      user,
    );
    expect(
      expected.contractDetail.documentation.chipCertificate.isApplied,
    ).toEqual(documentationRequest.chipCertificate.isApplied);
  });

  it('should_failed_contract_documentation', async () => {
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel();
    const documentationRequest = ContractDocumentationMother.create();
    const user = UserCreatorMother.createWithPassword();
    const documentation =
      CommandContractDocumentation.execute(documentationRequest);

    const error = new ErrorNotFound(ErrorNotFound.messageDefault());
    contractRepositoryMock.searchById.mockRejectedValueOnce(error);
    try {
      await contractDocumentation.execute(
        contract.id,
        contractDetail.id,
        documentation,
        user,
      );
      fail('should_failed_contract_documentation');
    } catch (throwError) {
      expect(throwError.message).toBe(error.message);
    }
  });
});
