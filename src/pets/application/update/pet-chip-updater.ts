import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { PetRepository } from '../../domain/pet.repository';
import { PetResponse } from '../../domain/interfaces/pet.response';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { ErrorDuplicateElement } from '../../../common/domain/errors/error-duplicate-element';
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { PetChip } from '../../../pets/domain/value-object/pet-chip';
import { PetChipDate } from '../../domain/value-object/pet-chip-date';
import { CommandPetCreator } from '../create/command-pet-creator';

export class PetChipUpdater {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(
    id: string,
    chip: PetChip,
    chipDate: PetChipDate,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.PETS, AuthPermission.EDIT);

    const uuid = new Uuid(id);

    const response = await this.petRepository.searchById<PetResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('mascota'));
    }

    const petWithChip = await this.petRepository.searchByChip(chip);
    if (petWithChip?.chip !== response?.chip && petWithChip) {
      throw new ErrorDuplicateElement('El chip ya se encuentra utilizado');
    }

    const petUpdated = CommandPetCreator.execute(
      {
        ...response,
        chip: chip.value,
        chipDate: chipDate.value,
      },
      response.user,
    );

    await this.petRepository.update(uuid, petUpdated);

    return ResponseMessage.createSuccessResponse(
      PetChipUpdater.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'la mascota',
    );
  }
}
