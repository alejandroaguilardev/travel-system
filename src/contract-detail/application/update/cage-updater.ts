import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractCage } from '../../domain/value-object/service-cage';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { AuthPermission } from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';
import { EnsureContractDetail } from './ensure-contract-detail';
import { ContractDetailInterface } from '../../../contract-detail/domain/interfaces/contract-detail.interface';

export class ContractDetailCageUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

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
    );
    const { contractResponse, contractDetailResponse } =
      await ensureContractDetail.searchEnsure(contractUuid, contractDetailUuid);
    ensureContractDetail.hasPermission(
      user,
      contractResponse,
      AuthPermission.CAGE,
    );

    cage.changeStatus();

    const contractDetail: ContractDetailInterface = {
      ...contractDetailResponse,
      cage: cage.toJson(),
    };

    const contract = CommandContractUpdater.execute({
      ...contractResponse,
      details: contractResponse.details.map((_) =>
        _.id === contractDetail.id ? contractDetail : _,
      ),
    });
    contract.status.client.statusError(contract.endDate.value);
    contract.establishedClientStatus();

    await this.contractRepository.update(contractUuid, contract);

    const response =
      await this.contractRepository.searchByIdWithPet(contractUuid);

    return {
      contract: response,
      contractDetail: response.details.find((_) => _.id === contractDetail.id),
    };
  }
}
