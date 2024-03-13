import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { ContractDetail } from '../../domain/contract-detail';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class ContractDetailCreator {
  constructor(
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    contractDetail: ContractDetail[],
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS,
      AuthPermission.CREATE,
    );

    await Promise.all(
      contractDetail.map((_) => this.contractDetailRepository.save(_)),
    );
    return ResponseMessage.createSuccessResponse(
      ContractDetailCreator.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_CREATED.replace(
      '{{elemento}}',
      'el detalle el contrato',
    );
  }
}
