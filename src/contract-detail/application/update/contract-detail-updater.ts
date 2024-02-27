import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { ContractDetail } from '../../domain/contract-detail';
import { CommandContractDetailsUpdater } from './command/command-contract-updater';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractDetailInterface } from 'src/contract-detail/domain/interfaces';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class ContractDetailUpdater {
  constructor(private readonly contractRepository: ContractDetailRepository) {}

  async execute(
    contractDetails: ContractDetail[],
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.EDIT);

    contractDetails.forEach(async (contractDetail) => {
      let updateContract: ContractDetail;

      const response =
        await this.contractRepository.searchById<ContractDetailInterface>(
          contractDetail.id,
        );
      if (response) {
        updateContract = CommandContractDetailsUpdater.execute(
          response,
          contractDetail.toJson(),
        );
      } else {
        updateContract = contractDetail;
      }

      await this.contractRepository.update(updateContract.id, updateContract);
    });

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
