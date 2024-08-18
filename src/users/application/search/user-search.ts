import { UserRepository } from '../../domain/user.repository';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';
import { UserResponse } from '../../domain/interfaces/user.response';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import {
  UserWithoutResponse,
  UserWithoutWithRoleResponse,
} from '../../domain/interfaces/user-without.response';
import {
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { ErrorAccess } from '../error/access';

export class UserSearch {
  constructor(private userRepository: UserRepository) { }

  async execute(
    criteriaRequest: CriteriaRequest,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<UserWithoutResponse>> {
    ErrorAccess.permission(user, AuthPermission.LIST);

    const criteria = CommandCriteria.fromData(criteriaRequest);
    return await this.userRepository.search<UserResponse>(criteria);
  }

}
