import { HttpInterface } from '../../../common/application/services/http-service';
import { DateService } from '../../../common/application/services/date-service';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../response/contract-detail.response';

export class TakeSampleNotification {
  constructor(
    private readonly http: HttpInterface,
    private readonly dateService: DateService,
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
      phone: contract.adviser.profile.phone,
      linkWhatsApp: contract.adviser?.linkWhatsApp ?? '',
      date: this.dateService.formatDateTime(
        contractDetail.documentation.rabiesSeroLogicalTest.expectedDate,
        'dd/MM/yyyy HH:mm:ss',
      ),
    };

    await this.http
      .post(`/notification/detail/taking-sample`, { ...data })
  }
}
