import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ErrorDuplicateElement } from '../../../common/domain/errors/error-duplicate-element';
import { Role } from '../../domain/role';
import { RoleRepository } from '../../domain/role.repository';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class RoleCreator {
  constructor(private readonly roleRepository: RoleRepository) {}

  async execute(
    role: Role,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.ROLES, AuthPermission.CREATE);

    const response = await this.roleRepository.searchById(role.id);

    if (response) {
      throw new ErrorDuplicateElement('rol');
    }

    await this.roleRepository.save(role);

    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
