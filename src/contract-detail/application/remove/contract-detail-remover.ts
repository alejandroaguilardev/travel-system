import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { ContractInterface } from '../../../contracts/domain/interfaces/contract.interface';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { CommandContractDetailsUpdater } from '../update';

export class ContractDetailRemover {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    id: string,
    detailId: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS,
      AuthPermission.DELETE,
    );

    const uuid = new Uuid(id);

    const response =
      await this.contractRepository.searchById<ContractInterface>(uuid);

    const details = response.details.filter((_) => _.id !== detailId);
    const contractDetail = CommandContractDetailsUpdater.execute(details);

    await this.contractRepository.updateDetail(uuid, contractDetail);
    return ResponseMessage.createSuccessResponse(
      ContractDetailRemover.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_DELETED.replace(
      '{{elemento}}',
      'el detalle el contrato',
    );
  }
}
