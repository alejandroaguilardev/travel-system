import { Uuid, UuidOptional } from '../../../common/domain/value-object';
import { Contract } from '../../domain/contract';
import {
  ContractNumber,
  ContractStatus,
  ContractStartDate,
  ContractEndDate,
} from '../../domain/value-object';

import { ContractCreateRequest } from './contract-create-request';
import { CommandContractDetailCreator } from '../../../contract-detail/application/create/command-contract-detail-creator';
import { ContractPrice } from '../../../contracts/domain/value-object/contract-price';
import { PayInInstallments } from '../../../contracts/domain/value-object/pay-in-installments/pay-in-installments';
import { CustomerPayments } from '../../../contracts/domain/value-object/customer-payments/customer-payments';
import { ContractPercentage } from '../../../contracts/domain/value-object/pay-in-installments/contract-percentage';
import { ContractDate } from '../../../contracts/domain/value-object/contract-date';
import { PayInInstallment } from '../../../contracts/domain/value-object/pay-in-installments/pay-in-installment';
import { CustomerPayment } from '../../../contracts/domain/value-object/customer-payments/customer-payment';
import { CustomerPaymentMethod } from '../../../contracts/domain/value-object/customer-payments/customer-payment-method';
import { ContractFolder } from '../../../contracts/domain/value-object/contract-folder';
import { ContractFinishClient } from '../../domain/value-object/contract-finish-client';
import { ContractReasonForCancellation } from '../../domain/value-object/reason-for-cancellation';
import { ContractIsPay } from '../../domain/value-object/pay-in-installments/contract-is-pay';
import { ContractFormat } from '../../domain/value-object/contract-format';

export class CommandContractCreator {
  static execute(data: ContractCreateRequest, userId: string): Contract {
    return new Contract(
      new Uuid(data.id),
      new ContractFolder(data.folder),
      new ContractNumber(data.number),
      new Uuid(data.client),
      new ContractStatus('pending'),
      new ContractStartDate(data.startDate),
      new ContractEndDate(null),
      CommandContractDetailCreator.execute(data.details, userId),
      new ContractPrice(data.price),
      new PayInInstallments(
        data.payInInstallments.map(
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
      ),

      new Uuid(data.adviser),
      new ContractFinishClient(data?.finishClient ?? false),
      new ContractReasonForCancellation(data?.reasonForCancellation ?? ''),
      new ContractFormat(data.format),
      new UuidOptional(userId),
    );
  }
}
