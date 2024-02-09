import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { PetRepository } from '../../domain/pet.repository';
import { PetResponse } from '../../domain/interfaces/pet.response';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';

export class PetSearchById {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(
    id: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<PetResponse> {
    PermissionValidator.execute(user, AuthGroup.PETS, AuthPermission.READ);
    const uuid = new Uuid(id);
    const response = await this.petRepository.searchById<PetResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('jaulas'));
    }

    return response;
  }
}
