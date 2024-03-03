import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { ContractCage } from '../../domain/value-object/service-cage';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { AuthPermission } from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';
import { EnsureContractDetail } from './ensure-contract-detail';

export class ContractDetailCageUpdater {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    contractId: string,
    contractDetailId: string,
    cage: ContractCage,
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

    cage.changeStatus();

    const contractDetail = {
      ...contractDetailResponse,
      cage: cage.toJson(),
    };

    contract.establishedStatus(
      detailsResponse.map((_) => {
        if (_.id === contractDetail.id) {
          return contractDetail as any;
        }
        return _;
      }),
    );

    await Promise.all([
      this.contractDetailRepository.updateCage(contractDetailUuid, cage),
      this.contractRepository.update(contractUuid, contract),
    ]);

    return {
      contract: contract.toJson(),
      contractDetail: {
        ...contractDetail,
        pet: detailsResponse.find((d) => d.pet.id === contractDetail.pet).pet,
      },
    };
  }
}
