import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractTravel } from '../../domain/value-object/service-travel';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { AuthPermission } from '../../../common/domain/auth-permissions';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';
import { EnsureContractDetail } from './ensure-contract-detail';
import { ContractDetailInterface } from '../../../contract-detail/domain/interfaces';

export class ContractDetailTravelUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    contractDetailId: string,
    travel: ContractTravel,
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
      AuthPermission.TRAVEL,
    );

    const contractDetail: ContractDetailInterface = {
      ...contractDetailResponse,
      travel: {
        ...travel.toJson(),
        accompaniedPet: contractDetailResponse.travel.accompaniedPet,
        destination: contractDetailResponse.travel.destination,
        petPerCharge: contractDetailResponse.travel.petPerCharge,
      },
    };

    contractDetail.travel.status = travel.statusCompleted(
      contractDetail.travel,
    );

    const contract = CommandContractUpdater.execute({
      ...contractResponse,
      details: contractResponse.details.map((_) =>
        _.id === contractDetail.id ? contractDetail : _,
      ),
    });

    contract.status.statusError(contract.endDate.value);
    contract.establishedStatus();

    await this.contractRepository.update(contractUuid, contract);

    const response =
      await this.contractRepository.searchByIdWithPet(contractUuid);

    return {
      contract: response,
      contractDetail: response.details.find((_) => _.id === contractDetail.id),
    };
  }
}
