import { HttpInterface } from '../../../common/application/services/http-service';
import { DateService } from '../../../common/application/services/date-service';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../response/contract-detail.response';
import { IncidentServiceInterface } from '../../../errors/domain/incident-service-interface';

export class SendMailSenasaIntroduceNotification {
  constructor(
    private readonly http: HttpInterface,
    private readonly dateService: DateService,
    private readonly incidentsService: IncidentServiceInterface,
  ) { }

  async execute(
    contract: ContractResponse,
    contractDetail: ContractDetailResponse,
  ): Promise<void> {
    const { pet } = contractDetail;

    const data = {
      client:
        contract?.client?.profile?.name + ' ' + contract?.client?.profile?.lastName,
      email: contract.client.email,
      petName: pet?.name ?? '',
      phone: contract?.client?.profile?.phone,
      phoneAdviser: contract.adviser.profile.phone,
      linkWhatsApp: contract.adviser?.linkWhatsApp ?? '',
      date: this.dateService.formatDateTime(
        contractDetail.documentation.rabiesSeroLogicalTest.expectedDate,
        'dd/MM/yyyy',
      ),
    };

    this.http
      .post(`/notification/detail/senasa-introduce`, { ...data })
      .catch(e => {
        this.incidentsService.create({
          id: crypto.randomUUID(),
          name: "/notification/detail/senasa-introduce",
          error: typeof e?.getMessage === "function" ? e?.getMessage() : e?.message ?? JSON.stringify(e),
          body: JSON.stringify(data),
        });
      });
  }
}
