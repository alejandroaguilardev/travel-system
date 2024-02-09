import { PetRepository } from '../../domain/pet.repository';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import {
  AuthPermission,
  AuthGroup,
} from '../../../common/domain/auth-permissions';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';

export class PetRemover {
  constructor(private readonly roleRepository: PetRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.PETS, AuthPermission.DELETE);

    const uuid = new Uuid(id);

    await this.roleRepository.remove(uuid);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_DELETED,
    );
  }
}
