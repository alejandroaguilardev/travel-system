import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { AuthGroup, AuthPermission } from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';
import { EnsureContractDetail } from './ensure-contract-detail';
import { ContractTopico } from '../../../contract-detail/domain/value-object/contract-topico';
import { CommandContractTopico } from './command/topico-command';
import { ContractTopicoInterface } from '../../../contract-detail/domain/interfaces/topico.interface';

export class ContractDetailTopicoUpdater {
  constructor(private readonly contractRepository: ContractRepository) { }

  async execute(
    contractId: string,
    contractDetailId: string,
    topicoPartial: Partial<ContractTopico>,
    value: keyof typeof ContractTopico.keysTopicoObject,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractUuid = new Uuid(contractId);
    const contractDetailUuid = new Uuid(contractDetailId);

    const ensureContractDetail = new EnsureContractDetail(
      this.contractRepository,
    );
    const { contractResponse, contractDetailResponse } =
      await ensureContractDetail.searchEnsure(contractUuid, contractDetailUuid);

    ensureContractDetail.hasPermission(
      user,
      contractResponse,
      AuthPermission.EXECUTE,
      AuthGroup.CONTRACT_TOPICO,
    );

    const topicoUpdate = CommandContractTopico.execute(
      {
        ...(contractDetailResponse?.topico ?? {}),
        [value]: topicoPartial.toJson(),
      } as ContractTopicoInterface,
      user.id,
    );

    const contractDetail = {
      ...contractDetailResponse,
      topico: topicoUpdate.toJson(),
    };

    const contract = CommandContractUpdater.execute({
      ...contractResponse,
      details: contractResponse.details.map((_) =>
        _.id === contractDetail.id ? contractDetail : _,
      ),
    });
    contract.status.petTravel.statusError(contract.endDate.value);

    await this.contractRepository.update(contractUuid, contract);

    const response =
      await this.contractRepository.searchByIdWithPet(contractUuid);

    return {
      contract: response,
      contractDetail: response.details.find((_) => _.id === contractDetail.id),
    };
  }
}
