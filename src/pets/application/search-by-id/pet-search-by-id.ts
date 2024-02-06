import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { PetRepository } from '../../domain/pet.repository';
import { PetResponse } from '../../domain/interfaces/pet.response';

export class PetSearchById {
  constructor(private readonly petRepository: PetRepository) {}

  async execute(id: string): Promise<PetResponse> {
    const uuid = new Uuid(id);
    const response = await this.petRepository.searchById<PetResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('jaulas'));
    }

    return response;
  }
}
