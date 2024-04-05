import { ContractDetailCertificateUpdater } from '../../../src/contract-detail/application/update/certificate-updater';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { ContractDocumentationMother } from '../domain/contract-documentation.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { PetMother } from '../../pet/domain/pet.mother';
import { CommandContractDocumentation } from '../../../src/contract-detail/application/update/command/command-documentation';

describe('ContractDetailCertificateUpdater', () => {
  const contractDetailCertificateUpdater = new ContractDetailCertificateUpdater(
    contractRepositoryMock,
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_certificate', async () => {
    const user = UserCreatorMother.createWithPassword();
    const pet = PetMother.createPetInterface();
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel({
      pet: pet.id,
    });

    const value = ContractDocumentationMother.value();
    const certificateDto = { [value]: ContractDocumentationMother[value]() };
    const certificatePartial = CommandContractDocumentation[value](
      certificateDto[value] as any,
    );

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(
      contractDetail,
    );
    contractDetailRepositoryMock.searchByIdWithPet.mockResolvedValueOnce({
      ...contractDetail,
      pet,
    });

    await contractDetailCertificateUpdater.execute(
      contract.id,
      contractDetail.id,
      certificatePartial as any,
      value,
      user,
    );

    expect(contractDetailRepositoryMock.updateDocumentation).toHaveBeenCalled();
  });
});
