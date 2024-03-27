import { ContractDetailTopicoUpdater } from '../../../src/contract-detail/application/update/topico-updater';
import { ContractDetailCreatorMother } from '../domain/contract-creator.mother';
import { contractDetailRepositoryMock } from '../domain/contract-detail-mock.repository';
import { TopicoMother } from '../domain/topico.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { PetMother } from '../../pet/domain/pet.mother';
import { CommandContractTopico } from '../../../src/contract-detail/application/update/command/topico-command';

describe('ContractDetailTopicoUpdater', () => {
  const contractTopicoUpdater = new ContractDetailTopicoUpdater(
    contractRepositoryMock,
    contractDetailRepositoryMock,
  );

  it('should_successfully_contract_topico', async () => {
    const user = UserCreatorMother.createWithPassword();
    const pet = PetMother.createPetInterface();
    const contract = ContractCreatorMother.createWithTravel();
    const contractDetail = ContractDetailCreatorMother.createWithTravel({
      pet: pet.id,
    });

    const value = TopicoMother.value();
    const topicoDto = { [value]: TopicoMother[value]() };
    const topicoPartial = CommandContractTopico[value](
      topicoDto[value] as any,
      user.id,
    );

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);
    contractDetailRepositoryMock.searchById.mockResolvedValueOnce(
      contractDetail,
    );
    contractDetailRepositoryMock.searchByIdWithPet.mockResolvedValueOnce({
      ...contractDetail,
      pet,
    });

    await contractTopicoUpdater.execute(
      contract.id,
      contractDetail.id,
      topicoPartial as any,
      value,
      user,
    );

    expect(contractDetailRepositoryMock.updateTopico).toHaveBeenCalled();
  });
});
