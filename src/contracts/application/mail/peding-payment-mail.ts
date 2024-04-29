import { HttpInterface } from '../../../common/application/services/http-service';
import { DateService } from '../../../common/application/services/date-service';
import { ContractResponse } from '../response/contract.response';

export class PendingPaymentMail {
  private colors = {
    default: '#fff',
    success: '#16B94E',
    danger: '#FF6C31',
  };

  constructor(
    private readonly http: HttpInterface,
    private readonly dateService: DateService,
  ) { }

  async execute(contract: ContractResponse): Promise<void> {
    const data = {
      email: contract.client.email,
      client:
        contract?.client?.profile?.name + ' ' + contract?.client?.profile?.name,
      phone: contract.adviser.profile.phone,
      payments: this.getPayments(contract),
    };

    this.http
      .post(`/mail/contract/payment-pending`, data)
      .catch((e) => console.log(e));
  }

  private getPayments(contract: ContractResponse): string {
    let payment = '';

    contract?.payInInstallments?.forEach((payInInstallment) => {
      let selectedColor = this.colors.success;
      if (!payInInstallment.isPay) {
        selectedColor =
          this.dateService.isSame(payInInstallment.date) ||
            this.dateService.isBefore(payInInstallment.date)
            ? this.colors.danger
            : this.colors.default;
      }

      payment += `<tr>
                    <td  align='center'style='padding:10px 0; background-color:${selectedColor}; color:${this.colors.default === selectedColor ? '#000' : '#fff'
        }'>
                        ${this.dateService.formatDateTime(
          payInInstallment.date,
          'dd/MM/yyyy',
        )}
                    </td>
                    <td  align='center'style='padding:10px 0; background-color:${selectedColor}; color:${this.colors.default === selectedColor ? '#000' : '#fff'
        }'>
                    ${payInInstallment.price.toFixed(2)}$</td>
                    <td  align='center'style='padding:10px 0; background-color:${selectedColor}; color:${this.colors.default === selectedColor ? '#000' : '#fff'
        }'>
                        ${payInInstallment.isPay ? 'Pagado' : 'Pendiente'}
                    </td>
                </tr>`;
    });

    return payment;
  }
}
