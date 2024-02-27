import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractWithDetailsResponse } from '../response/contract.response';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ErrorNotAuthorization } from '../../../common/domain/errors/error-not-authorization';
import { ContractDetailRepository } from '../../../contract-detail/domain/contract-detail.repository';

export class ContractSearchByIdClient {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}
  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractWithDetailsResponse[]> {
    const uuid = new Uuid(id);
    const contracts =
      await this.contractRepository.searchContractByClient(uuid);

    const response: ContractWithDetailsResponse[] = [];

    for (const contract of contracts) {
      const details = await Promise.all(
        contract.details.map(async (detailId) => {
          const detailUuid = new Uuid(detailId);
          return await this.contractDetailRepository.searchByIdWithPet(
            detailUuid,
          );
        }),
      );
      response.push({
        ...contract,
        details,
      });
    }
    this.checkIsUserAsOwner(user, uuid);
    return response;
  }

  private checkIsUserAsOwner(user: UserWithoutWithRoleResponse, uuid: Uuid) {
    if (uuid.value !== user.id) {
      throw new ErrorNotAuthorization(
        'No eres el propietario de estos contrato',
      );
    }
  }
}
