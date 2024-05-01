import { HttpInterface } from '../../../common/application/services/http-service';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { ContractDetailResponse } from '../response/contract-detail.response';

export class TakeSampleExecutedMail {
  constructor(private readonly http: HttpInterface) {}

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
    };

    this.http
      .post(`/mail/detail/taking-sample-executed`, { ...data })
      .catch((e) => console.log(e));
  }
}
