import { HttpInterface } from '../../../common/application/services/http-service';
import { ContractRepository } from '../../domain/contract.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';

export class FinishContractNotification {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly http: HttpInterface,
  ) { }

  async execute(contractId: Uuid): Promise<void> {
    const contract =
      await this.contractRepository.searchByIdWithPet(contractId);

    await this.http
      .post(`/notification/contract/finish`, {
        email: contract.client.email,
        client:
          contract?.client?.profile?.name +
          ' ' +
          contract?.client?.profile?.name,
        phone: contract?.client?.profile?.phone,
        phoneAdviser: contract.adviser.profile.phone,
        linkWhatsApp: contract.adviser?.linkWhatsApp ?? '',
      })
      .catch(e => console.log(e));
  }
}
