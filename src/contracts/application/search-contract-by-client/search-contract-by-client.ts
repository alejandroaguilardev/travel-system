import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractRepository } from '../../domain/contract.repository';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ErrorNotAuthorization } from '../../../common/domain/errors/error-not-authorization';
import { ContractResponse } from '../response/contract.response';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';

export class ContractSearchByIdClient {
  constructor(private readonly contractRepository: ContractRepository) {}
  async execute(
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractResponse[]> {
    const uuid = new Uuid(user.id);
    const criteria = CommandCriteria.fromData({
      filters: [
        { field: 'client.id', value: uuid.value, operator: 'CONTAINS' },
        { field: 'endDate', value: null, operator: 'CONTAINS' },
      ],
    });

    const { rows } =
      await this.contractRepository.search<ContractResponse>(criteria);

    this.checkIsUserAsOwner(user, uuid);
    return rows;
  }

  private checkIsUserAsOwner(user: UserWithoutWithRoleResponse, uuid: Uuid) {
    if (uuid.value !== user.id) {
      throw new ErrorNotAuthorization(
        'No eres el propietario de estos contrato',
      );
    }
  }
}
