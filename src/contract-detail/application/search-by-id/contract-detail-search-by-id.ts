import { Uuid } from '../../../common/domain/value-object/uuid';
import { AuthPermission } from '../../../common/domain/auth-permissions';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { EnsureContractDetail } from '../update/ensure-contract-detail';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { ContractDetailInterface } from '../../../contract-detail/domain/interfaces/contract-detail.interface';

export class ContractDetailSearchById {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    contractDetailId: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailInterface> {
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
      AuthPermission.READ,
    );

    return contractDetailResponse;
  }
}
