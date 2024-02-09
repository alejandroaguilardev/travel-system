import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ErrorNotAuthorization } from '../../../common/domain/errors/error-not-authorization';

export class ContractSearchByIdClient {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse[]> {
    const uuid = new Uuid(id);
    const response = await this.contractRepository.searchContractByClient(uuid);

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
