import { PetRepository } from '../../domain/pet.repository';
import { Criteria } from '../../../common/domain/criteria/criteria';
import { PetResponse } from '../../domain/interfaces/pet.response';
import { ResponseSearch } from '../../../common/domain/response/response-search';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export class PetSearch {
  constructor(private readonly petRepository: PetRepository) {}

  execute(
    criteria: Criteria,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSearch<PetResponse>> {
    PermissionValidator.execute(user, AuthGroup.PETS, AuthPermission.LIST);

    return this.petRepository.search<PetResponse>(criteria);
  }
}
