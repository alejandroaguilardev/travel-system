import { HttpInterface } from '../../../common/application/services/http-service';
import { ContractRepository } from '../../domain/contract.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { IncidentServiceInterface } from '../../../errors/domain/incident-service-interface';

export class FinishContractNotification {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly http: HttpInterface,
    private readonly incidentsService: IncidentServiceInterface,
  ) { }

  async execute(contractId: Uuid): Promise<void> {
    const contract =
      await this.contractRepository.searchByIdWithPet(contractId);
    const data = {
      email: contract.client.email,
      client:
        contract?.client?.profile?.name +
        ' ' +
        contract?.client?.profile?.name,
      phone: contract?.client?.profile?.phone,
      phoneAdviser: contract.adviser.profile.phone,
      linkWhatsApp: contract.adviser?.linkWhatsApp ?? '',
    };

    await this.http
      .post(`/notification/contract/finish`,)
      .catch(e => {
        this.incidentsService.create({
          id: crypto.randomUUID(),
          name: "/notification/contract/finish",
          error: e.getMessage(),
          body: JSON.stringify(data),
        });
      });
  }
}
