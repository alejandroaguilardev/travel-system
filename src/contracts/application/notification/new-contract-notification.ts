import { HttpInterface } from '../../../common/application/services/http-service';
import { ContractRepository } from '../../domain/contract.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { DateService } from '../../../common/application/services/date-service';

export class NewContractNotification {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly http: HttpInterface,
    private readonly date: DateService,
  ) {}

  async execute(contractId: Uuid): Promise<void> {
    const contract =
      await this.contractRepository.searchByIdWithPet(contractId);

    this.http
      .post(`/notification/contract/new`, {
        email: contract.client.email,
        client:
          contract?.client?.profile?.name +
          ' ' +
          contract?.client?.profile?.name,
        phone: contract.adviser.profile.phone,
        linkWhatsApp: contract.adviser?.linkWhatsApp ?? '',
        estimatedDate: this.date.formatDateTime(
          contract.estimatedDate,
          'dd/MM/yyyy',
        ),
      })
      .catch((e) => console.log(e));
  }
}
