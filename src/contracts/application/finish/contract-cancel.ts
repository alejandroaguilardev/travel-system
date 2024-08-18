import { ResponseMessage } from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ContractRepository } from '../../domain/contract.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorInvalidadArgument } from '../../../common/domain/errors/error-invalid-argument';
import { ContractEndDate } from '../../domain/value-object/contract-end-date';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ContractInterface } from '../../domain/interfaces/contract.interface';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { CommandContractUpdater } from '../update';
import { Contract } from '../../domain/contract';
import { ContractReasonForCancellation } from '../../domain/value-object/reason-for-cancellation';

export class ContractCancel {
  constructor(private readonly contractRepository: ContractRepository) { }

  async execute(
    contractId: string,
    reasonForCancellation: ContractReasonForCancellation,
    user: UserWithoutWithRoleResponse,
  ): Promise<{ contract: Contract; response: ResponseSuccess }> {
    const uuid = new Uuid(contractId);
    const response =
      await this.contractRepository.searchById<ContractInterface>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    this.permissionCancel(user, response);

    if (response.status.petTravel === 'completed') {
      throw new ErrorInvalidadArgument(ContractCancel.messageNotCompleted());
    }
    const endDate = new ContractEndDate(new Date());

    await this.contractRepository.cancel(uuid, endDate, reasonForCancellation, {
      client: 'canceled',
      petTravel: 'canceled',
    });

    const contract = CommandContractUpdater.execute(response);
    return {
      contract,
      response: ResponseMessage.createSuccessResponse(
        ContractCancel.messageSuccess(),
      ),
    };
  }

  static messageSuccess() {
    return 'El contrato se cancelo con éxito';
  }

  static messageNotCompleted() {
    return 'El contrato no puede cancelarse por que ya esta completado';
  }

  private permissionCancel(
    user: UserWithoutWithRoleResponse,
    contract: ContractInterface,
  ) {
    if (user.id === contract.client) {
      return;
    }

    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACT_FINISH,
      AuthPermission.DELETE,
    );
  }
}
