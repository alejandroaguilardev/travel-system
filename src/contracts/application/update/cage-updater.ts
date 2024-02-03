import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';
import { ContractCage } from '../../domain/value-object/services/service-cage';
import { UserWithoutWithRoleResponse } from '../../../users/application/response/user-without.response';
import { ContractStatus } from '../../domain/value-object/contract-status';

export class ContractCageUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    cage: ContractCage,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse> {
    if (!user) {
      console.log(user);
    }

    const uuid = new Uuid(contractId);

    const contract =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    const status = new ContractStatus(contract.status);
    status.statusError();

    await this.contractRepository.updateCage(uuid, status, cage);
    return {
      ...contract,
      services: {
        ...contract.services,
        cage: cage.toJson(),
      },
      status: status.value,
    };
  }
}
