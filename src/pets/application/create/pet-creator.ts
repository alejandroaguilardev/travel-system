import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  ResponseMessage,
  MessageDefault,
} from '../../../common/domain/response/response-message';
import { PetRepository } from '../../domain/pet.repository';
import { Pet } from '../../domain/pet';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ErrorDuplicateElement } from '../../../common/domain/errors/error-duplicate-element';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';

export class PetCreator {
  constructor(private readonly petRepository: PetRepository) {}

  async create(
    pet: Pet,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.PETS, AuthPermission.CREATE);

    if (pet.chip.value) {
      const response = await this.petRepository.searchByChip(pet.chip);

      if (response) {
        throw new ErrorDuplicateElement('El chip ya se encuentra utilizado');
      }
    }

    await this.petRepository.save(pet);
    return ResponseMessage.createSuccessResponse(PetCreator.messageSuccess());
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_CREATED.replace(
      '{{elemento}}',
      'la mascota',
    );
  }
}
