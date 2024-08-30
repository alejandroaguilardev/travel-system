import { HttpInterface } from '../../../common/application/services/http-service';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { IncidentServiceInterface } from '../../../errors/domain/incident-service-interface';

export class TakeSampleExecutedNotification {
  constructor(
    private readonly http: HttpInterface,
    private readonly incidentsService: IncidentServiceInterface,
  ) { }

  async execute(
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
  ): Promise<void> {
    const { pet } = contractDetail;

    const data = {
      client:
        contract?.client?.profile?.name + ' ' + contract?.client?.profile?.name,
      email: contract.client.email,
      petName: pet?.name ?? '',
      phone: contract?.client?.profile?.phone,
      phoneAdviser: contract.adviser.profile.phone,
      linkWhatsApp: contract.adviser?.linkWhatsApp ?? '',
    };

    await this.http
      .post(`/notification/detail/taking-sample-executed`, { ...data })
      .catch(e => {
        this.incidentsService.create({
          id: crypto.randomUUID(),
          name: "/notification/detail/taking-sample-executed",
          error: e.getMessage(),
          body: JSON.stringify(data),
        });
      });
  }
}
