import { HttpInterface } from '../../../common/application/services/http-service';
import { DateService } from '../../../common/application/services/date-service';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../response/contract-detail.response';

export class SendMailSenasaIntroduce {
  constructor(
    private readonly http: HttpInterface,
    private readonly dateService: DateService,
  ) {}

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
      phone: contract.adviser.profile.phone,
      date: this.dateService.formatDateTime(
        contractDetail.documentation.rabiesSeroLogicalTest.expectedDate,
        'DD/MM/YYYY',
      ),
    };

    this.http
      .post(`/mail/detail/senasa-introduce`, { data })
      .catch((e) => console.log(e));
  }
}
