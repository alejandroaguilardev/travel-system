import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { ContractDetail } from '../../domain/contract-detail';
import { CommandContractUpdater } from './command/command-contract-updater';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class ContractDetailUpdater {
  constructor(private readonly contractRepository: ContractDetailRepository) {}

  async execute(
    id: string,
    contractDetail: ContractDetail,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.EDIT);

    const uuid = new Uuid(id);

    const response =
      await this.contractRepository.searchById<ContractDetailResponse>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    const updateContract = CommandContractUpdater.execute(
      response,
      contractDetail.toJson(),
    );

    await this.contractRepository.update(uuid, updateContract);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
