import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractRepository } from '../../domain/contract.repository';
import { ContractResponse } from '../response/contract.response';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ErrorNotAuthorization } from '../../../common/domain/errors/error-not-authorization';
import { ResponseSearch } from '../../../common/domain/response';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';

export class ContractSearchClient {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    criteriaRequest: CriteriaRequest,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<ContractResponse>> {
    const uuid = new Uuid(user.id);
    const criteria = CommandCriteria.fromData({
      ...criteriaRequest,
      filters: [
        ...criteriaRequest.filters,
        { field: 'client.id', value: uuid.value, operator: 'CONTAINS' },
      ],
    });

    const { rows, count } =
      await this.contractRepository.search<ContractResponse>(criteria);
    this.checkIsUserAsOwner(user, uuid);
    return { rows, count };
  }

  private checkIsUserAsOwner(user: UserWithoutWithRoleResponse, uuid: Uuid) {
    if (uuid.value !== user.id) {
      throw new ErrorNotAuthorization(
        'No eres el propietario de estos contrato',
      );
    }
  }
}
