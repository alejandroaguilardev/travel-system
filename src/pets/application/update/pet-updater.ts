import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PetRepository } from '../../domain/pet.repository';
import { Pet } from '../../domain/pet';
import { PetResponse } from '../../domain/interfaces/pet.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ErrorDuplicateElement } from '../../../common/domain/errors/error-duplicate-element';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class PetUpdater {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(
    id: string,
    pet: Pet,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.PETS, AuthPermission.EDIT);

    const uuid = new Uuid(id);

    const response = await this.petRepository.searchById<PetResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('mascota'));
    }

    if (pet.chip.value) {
      const petWithChip = await this.petRepository.searchByChip(pet.chip);
      if (petWithChip?.chip !== response?.chip && petWithChip) {
        throw new ErrorDuplicateElement('El chip ya se encuentra utilizado');
      }
    }
    await this.petRepository.update(uuid, pet);

    return ResponseMessage.createSuccessResponse(PetUpdater.messageSuccess());
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'la mascota',
    );
  }
}
