import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { ContractDetailPetUpdaterRequest } from './contract-detail-pet-updater-request';
import { ErrorNotFound } from '../../../common/domain/errors';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ContractDetailInterface } from '../../../contract-detail/domain/interfaces';
import { CommandContractDetailsUpdater } from '../update';

export class ContractDetailPetUpdater {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    contractId: string,
    { details }: ContractDetailPetUpdaterRequest,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractUuid = new Uuid(contractId);

    const contract =
      await this.contractRepository.searchById<ContractResponse>(contractUuid);

    if (!contract) {
      throw ErrorNotFound.messageDefault('contrato');
    }

    this.permission(user, contract.client);

    await Promise.all(
      details.map(async ({ id, pet }) => {
        const response =
          await this.contractDetailRepository.searchById<ContractDetailInterface>(
            new Uuid(id),
          );
        const contractDetail = CommandContractDetailsUpdater.execute(response, {
          pet,
        });
        return this.contractDetailRepository.update(
          new Uuid(id),
          contractDetail,
        );
      }),
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
