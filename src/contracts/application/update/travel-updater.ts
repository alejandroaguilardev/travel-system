import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractTravel } from '../../domain/value-object/services/service-travel';
import { ContractResponse } from '../response/contract.response';
import { ContractStatus } from '../../domain/value-object/contract-status';
import { UserWithoutWithRoleResponse } from '../../../users/application/response/user-without.response';

export class ContractTravelUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    travel: ContractTravel,
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

    travel.setAirlineReservation();

    await this.contractRepository.updateTravel(uuid, status, travel);

    return {
      ...contract,
      services: {
        ...contract.services,
        travel: travel.toJson(),
      },
      status: status.value,
    };
  }
}
