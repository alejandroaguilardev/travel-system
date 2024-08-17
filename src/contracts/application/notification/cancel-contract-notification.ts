import { HttpInterface } from '../../../common/application/services/http-service';
import { ContractRepository } from '../../domain/contract.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';

export class CancelContractNotification {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly http: HttpInterface,
  ) { }

  async execute(contractId: Uuid): Promise<void> {
    const contract =
      await this.contractRepository.searchByIdWithPet(contractId);

    await this.http
      .post(`/notification/contract/cancel`, {
        email: contract.client.email,
        client:
          contract?.client?.profile?.name +
          ' ' +
          contract?.client?.profile?.name,
        phone: contract.adviser.profile.phone,
        linkWhatsApp: contract.adviser?.linkWhatsApp ?? '',
        correlative: contract?.correlative ?? '',
        reasonForCancellation: contract.reasonForCancellation,
      })
  }
}
