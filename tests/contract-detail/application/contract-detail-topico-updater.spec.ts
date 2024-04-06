import { ContractDetailTopicoUpdater } from '../../../src/contract-detail/application/update/topico-updater';
import { TopicoMother } from '../domain/topico.mother';
import { UserCreatorMother } from '../../users/domain/create-user-mother';
import { contractRepositoryMock } from '../../contracts/domain/contract-mock.repository';
import { ContractCreatorMother } from '../../contracts/domain/contract-creator.mother';
import { CommandContractTopico } from '../../../src/contract-detail/application/update/command/topico-command';

describe('ContractDetailTopicoUpdater', () => {
  const contractTopicoUpdater = new ContractDetailTopicoUpdater(
    contractRepositoryMock,
  );

  it('should_successfully_contract_topico', async () => {
    const user = UserCreatorMother.createWithPassword();
    const contract = ContractCreatorMother.createWithTravel();
    const contractResponse = ContractCreatorMother.createResponse({
      id: contract.id,
    });

    const value = TopicoMother.value();
    const topicoDto = { [value]: TopicoMother[value]() };
    const topicoPartial = CommandContractTopico[value](
      topicoDto[value] as any,
      user.id,
    );

    contractRepositoryMock.searchById.mockResolvedValueOnce(contract);

    contractRepositoryMock.searchByIdWithPet.mockResolvedValueOnce(
      contractResponse,
    );

    await contractTopicoUpdater.execute(
      contract.id,
      contract.details[0].id,
      topicoPartial as any,
      value,
      user,
    );

    expect(contractRepositoryMock.update).toHaveBeenCalled();
  });
});
