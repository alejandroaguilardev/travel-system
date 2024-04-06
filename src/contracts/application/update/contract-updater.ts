import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractRepository } from '../../domain/contract.repository';
import { Contract } from '../../domain/contract';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractInterface } from '../../domain/interfaces/contract.interface';

export class ContractUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    id: string,
    contract: Contract,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.EDIT);

    const uuid = new Uuid(id);

    const response =
      await this.contractRepository.searchById<ContractInterface>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    await this.contractRepository.update(uuid, contract);

    return ResponseMessage.createSuccessResponse(
      ContractUpdater.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'el contrato',
    );
  }
}
