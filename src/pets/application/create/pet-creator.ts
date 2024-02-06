import { ResponseSuccess } from '../../../common/domain/response/response-success';
import {
  ResponseMessage,
  MessageDefault,
} from '../../../common/domain/response/response-message';
import { PetRepository } from '../../domain/pet.repository';
import { Pet } from '../../domain/pet';
import { UserWithoutWithRoleResponse } from '../../../users/application/response/user-without.response';

export class PetCreator {
  constructor(private readonly petRepository: PetRepository) {}

  async create(
    pet: Pet,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    if (!user) {
      console.log(user);
    }
    await this.petRepository.save(pet);
    return ResponseMessage.createDefaultMessage(
      MessageDefault.SUCCESSFULLY_CREATED,
    );
  }
}
