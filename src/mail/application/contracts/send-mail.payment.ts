import { UserEmail } from '../../../users/domain/value-object/user-email';
import Template from '../../domain/contracts/contract-payment';
import { ContractResponse } from '../../../contracts/application/response/contract.response';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { DateService } from '../../../common/application/services/date-service';

export class SendMailPayment {
  private colors = {
    default: '#fff',
    success: '#16B94E',
    danger: '#FF6C31',
  };
  constructor(
    private readonly transporter: any,
    private readonly dateService: DateService,
  ) {}

  async execute(contract: ContractResponse): Promise<void> {
    const email = new UserEmail(contract.client.email);

    await this.transporter.sendMail(
      this.options(
        email,
        this.getHtml(
          contract.adviser,
          contract.adviser.profile.phone,
          contract,
        ),
      ),
    );
  }

  options(email: UserEmail, html: string) {
    return {
      from: `Pet travel <${process.env.MAIL_TO}>`,
      to: email,
      subject: `Pet Travel Notificación de pago de cuota`,
      html,
    };
  }

  getHtml(
    user: UserWithoutWithRoleResponse,
    phone: string,
    contract: ContractResponse,
  ) {
    return Template.replaceAll(
      '{{client}}',
      `${user?.profile?.name ?? 'Cliente'} ${user?.profile?.lastName ?? ''}`,
    )
      .replaceAll('{{phone}}', phone)
      .replaceAll('{{payments}}', this.getPayments(contract));
  }

  getPayments(contract: ContractResponse): string {
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
                <td  align="center"style="padding:10px 0; background-color:${selectedColor}; color:${
                  this.colors.default === selectedColor ? '#000' : '#fff'
                }">
                    ${this.dateService.formatDateTime(
                      payInInstallment.date,
                      'DD/MM/YYYY',
                    )}
                </td>
                <td  align="center"style="padding:10px 0; background-color:${selectedColor}; color:${
                  this.colors.default === selectedColor ? '#000' : '#fff'
                }">
                ${payInInstallment.price.toFixed(2)}$</td>
                <td  align="center"style="padding:10px 0; background-color:${selectedColor}; color:${
                  this.colors.default === selectedColor ? '#000' : '#fff'
                }">
                    ${payInInstallment.isPay ? 'Pagado' : 'Pendiente'}
                </td>
            </tr>`;
    });

    return payment;
  }
}
