import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { CageRepository } from '../../domain/cage.repository';
import { CageResponse } from '../../domain/interfaces/cage.response';

export class CageSearchById {
  constructor(private readonly cageRepository: CageRepository) {}

  async execute(id: string): Promise<CageResponse> {
    const uuid = new Uuid(id);
    const response = await this.cageRepository.searchById<CageResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('jaulas'));
    }

    return response;
  }
}
