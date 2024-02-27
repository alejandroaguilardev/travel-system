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
import { Contract } from '../../domain/contract';
import { CommandContractUpdater } from './command-contract-updater';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractDetail } from '../../../contract-detail/domain/contract-detail';
import { ContractDetails } from '../../domain/value-object/contract-details';

export class ContractUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    id: string,
    contract: Contract,
    contractDetails: ContractDetail[],
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.EDIT);

    const uuid = new Uuid(id);

    const response =
      await this.contractRepository.searchById<ContractResponse>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    const updateContract = CommandContractUpdater.execute(
      response,
      contract.toJson(),
    );

    const details = contractDetails.map((detail) => detail.id.value);

    updateContract.setDetails(new ContractDetails(details));

    await this.contractRepository.update(uuid, updateContract);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_UPDATED,
    );
  }
}
