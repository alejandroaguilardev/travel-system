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
import { ContractResponse } from '../response/contract.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractFolder } from '../../../contracts/domain/value-object/contract-folder';
import { ContractNumber } from '../../../contracts/domain/value-object';

export interface FolderUpdaterRequest {
  folder: string;
  number: string;
}

export class ContractFolderUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    id: string,
    folderUpdaterRequest: FolderUpdaterRequest,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.EDIT);

    const uuid = new Uuid(id);
    const folder = new ContractFolder(folderUpdaterRequest.folder);
    const number = new ContractNumber(folderUpdaterRequest.number);

    const response =
      await this.contractRepository.searchById<ContractResponse>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    await this.contractRepository.updateFolder(uuid, folder, number);

    return ResponseMessage.createSuccessResponse(
      ContractFolderUpdater.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'el contrato',
    );
  }
}
