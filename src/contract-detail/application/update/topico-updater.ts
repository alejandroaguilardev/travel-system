import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { AuthPermission } from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';
import { EnsureContractDetail } from './ensure-contract-detail';
import { ContractTopico } from '../../../contract-detail/domain/value-object/contract-topico';
import { CommandContractTopico } from './command/topico-command';
import { ContractTopicoInterface } from '../../../contract-detail/domain/interfaces/topico.interface';

export class ContractDetailTopicoUpdater {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

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
      this.contractDetailRepository,
    );
    const { contractResponse, contractDetailResponse, detailsResponse } =
      await ensureContractDetail.searchEnsure(contractUuid, contractDetailUuid);

    ensureContractDetail.hasPermission(
      user,
      contractResponse,
      AuthPermission.CAGE,
    );

    const contract = CommandContractUpdater.execute(contractResponse);
    contract.status.statusError(contract.endDate.value);

    const topicoUpdate = CommandContractTopico.execute(
      {
        ...(contractDetailResponse?.topico ?? {}),
        [value]: topicoPartial.toJson(),
      } as ContractTopicoInterface,
      user.id,
    );

    await Promise.all([
      this.contractDetailRepository.updateTopico(
        contractDetailUuid,
        topicoUpdate,
      ),
      this.contractRepository.update(contractUuid, contract),
    ]);

    return {
      contract: contract.toJson(),
      contractDetail: {
        ...contractDetailResponse,
        pet: detailsResponse.find(
          (d) => d.pet.id === contractDetailResponse.pet,
        ).pet,
      },
    };
  }
}
