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
import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import { MeasurementsAndWeightInterface } from '../../../pets/domain/interfaces/pet-measurements-and-weight';
import { CageChosenInterface } from '../../../contract-detail/domain/interfaces';
import { CommandPetCreator } from '../create/command-pet-creator';

export interface PetMeasurementsAndWeightUpdaterRequest {
  race: string;
  color: string;
  type: string;
  sterilized: string;
  cageRecommendation?: CageChosenInterface;
  measurementsAndWeight?: MeasurementsAndWeightInterface;
}

export class PetMeasurementsAndWeightUpdater {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(
    id: string,
    data: PetMeasurementsAndWeightUpdaterRequest,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.PETS, AuthPermission.EDIT);

    const uuid = new Uuid(id);

    const response = await this.petRepository.searchById<PetResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('mascota'));
    }

    const petUpdated = CommandPetCreator.execute(
      {
        ...response,
        ...data,
      },
      response.user,
    );

    await this.petRepository.update(uuid, petUpdated);

    return ResponseMessage.createSuccessResponse(
      PetMeasurementsAndWeightUpdater.messageSuccess(),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'la mascota',
    );
  }
}
