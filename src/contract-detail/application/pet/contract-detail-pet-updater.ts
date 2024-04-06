import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { ContractDetailPetUpdaterRequest } from './contract-detail-pet-updater-request';
import { ErrorNotFound } from '../../../common/domain/errors';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ContractInterface } from '../../../contracts/domain/interfaces/contract.interface';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';

export class ContractDetailPetUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    { details }: ContractDetailPetUpdaterRequest,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractUuid = new Uuid(contractId);

    const contract =
      await this.contractRepository.searchById<ContractInterface>(contractUuid);

    if (!contract) {
      throw ErrorNotFound.messageDefault('contrato');
    }

    this.permission(user, contract.client);

    const contractDetails = contract.details.map((item) => {
      const detail = details.find((_) => _.id === item.id);
      if (detail) {
        return { ...item, pet: detail.pet };
      }
      return item;
    });

    contract.details = contractDetails;

    await this.contractRepository.update(
      contractUuid,
      CommandContractUpdater.execute(contract),
    );

    return ResponseMessage.createSuccessResponse(
      ContractDetailPetUpdater.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_CREATED.replace(
      '{{elemento}}',
      'Las mascotas fueron actualizadas',
    );
  }

  private permission(user: UserWithoutWithRoleResponse, client: string) {
    if (client === user.id) {
      return;
    }
    PermissionValidator.execute(
      user,
      AuthGroup.CONTRACTS,
      AuthPermission.CREATE,
    );
  }
}
