import {
  AuthGroup,
  AuthPermission,
} from '../../../common/domain/auth-permissions';
import {
  MessageDefault,
  ResponseMessage,
} from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { ContractRepository } from '../../domain/contract.repository';
import { PermissionValidator } from '../../../auth/application/permission/permission-validate';
import { PayInInstallmentInterface } from '../../domain/interfaces/pay-in-installment.interface';
import { ContractInterface } from '../../domain/interfaces/contract.interface';
import { PayInInstallments } from '../../domain/value-object/pay-in-installments/pay-in-installments';
import { PayInInstallment } from '../../domain/value-object/pay-in-installments/pay-in-installment';
import { ContractDate } from '../..//domain/value-object/contract-date';
import { ContractPrice } from '../..//domain/value-object/contract-price';
import { CustomerPayment } from '../..//domain/value-object/customer-payments/customer-payment';
import { CustomerPaymentMethod } from '../..//domain/value-object/customer-payments/customer-payment-method';
import { CustomerPayments } from '../..//domain/value-object/customer-payments/customer-payments';
import { ContractIsPay } from '../..//domain/value-object/pay-in-installments/contract-is-pay';
import { ContractPercentage } from '../..//domain/value-object/pay-in-installments/contract-percentage';

export class ContractPayInInstallmentsUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    id: string,
    payInInstallments: PayInInstallmentInterface[],
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    PermissionValidator.execute(user, AuthGroup.CONTRACTS, AuthPermission.EDIT);
    const uuid = new Uuid(id);

    const response =
      await this.contractRepository.searchById<ContractInterface>(uuid);
    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault('contrato'));
    }

    const data = this.securePayInInstallments(payInInstallments);

    await this.contractRepository.updatePayment(uuid, data);

    return ResponseMessage.createSuccessResponse(
      ContractPayInInstallmentsUpdater.messageSuccess(),
    );
  }

  securePayInInstallments(payInInstallments: PayInInstallmentInterface[]) {
    return new PayInInstallments(
      payInInstallments.map(
        (_) =>
          new PayInInstallment(
            new ContractPrice(_.price),
            new ContractPercentage(_.percentage),
            new ContractDate(_.date),
            new ContractIsPay(_.isPay),
            new CustomerPayments(
              _.customerPayments.map(
                (_) =>
                  new CustomerPayment(
                    new ContractPrice(_.price),
                    new CustomerPaymentMethod(_.method),
                    new ContractDate(_.date),
                  ),
              ),
            ),
          ),
      ),
    );
  }

  static messageSuccess(): string {
    return MessageDefault.SUCCESSFULLY_UPDATED.replace(
      '{{elemento}}',
      'el contrato',
    );
  }
}
