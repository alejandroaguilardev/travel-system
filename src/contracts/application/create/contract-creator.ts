import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ContractRepository } from '../../domain/contract.repository';
import { Contract } from '../../domain/contract';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractDetail } from '../../../contract-detail/domain/contract-detail';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { ContractDetails } from '../../domain/value-object/contract-details';

export class ContractCreator {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contract: Contract,
    contractDetails: ContractDetail[],
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS,
      AuthPermission.CREATE,
    );

    const detail = contractDetails.map((detail) => detail.id.value);

    contract.setDetails(new ContractDetails(detail));

    await this.contractRepository.save(contract);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
