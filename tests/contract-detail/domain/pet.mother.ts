import { ContractDetailPetUpdaterRequest } from '../../../src/contract-detail/application/pet/contract-detail-pet-updater-request';
import { UuidMother } from '../../common/domain/uuid-mother';

export class DetailPetMother {
  static create(
    data?: ContractDetailPetUpdaterRequest,
  ): ContractDetailPetUpdaterRequest {
    return (
      data ?? {
        details: [
          {
            id: UuidMother.create(),
            pet: UuidMother.create(),
          },
        ],
      }
    );
  }
}
