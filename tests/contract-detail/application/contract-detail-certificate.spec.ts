import { ContractDetailCertificateUpdater } from '../../../src/contract-detail/application/update/certificate-updater';
import { ContractDocumentationMother } from '../domain/contract-documentation.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { CommandContractDocumentation } from '../../../src/contract-detail/application/update/command/command-documentation';

describe('ContractDetailCertificateUpdater', () => {
  const contractDetailCertificateUpdater = new ContractDetailCertificateUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_certificate', async () => {
    const user = UserCreatorMother.createWithPassword();
    const value = ContractDocumentationMother.value();
    const certificateDto = { [value]: ContractDocumentationMother[value]() };

    const contract = ContractCreatorMother.createWithTravel();
    const contractResponse = ContractCreatorMother.createResponse({
      id: contract.id,
    });
    contractResponse.details[0].id = contract.details[0].id;
    contractResponse.details[0].documentation[value] = certificateDto as any;

    const certificatePartial = CommandContractDocumentation[value](
      certificateDto[value] as any,
    );
    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);

    contractRepositoryMock.searchByIdWithPet.mockResolvedValueOnce(
      contractResponse,
    );

    await contractDetailCertificateUpdater.execute(
      contract.id,
      contract.details[0].id,
      certificatePartial as any,
      value,
      user,
    );

    expect(contractRepositoryMock.update).toHaveBeenCalled();
  });
});
