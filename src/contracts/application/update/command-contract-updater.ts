import {
  ContractStatusDetail,
  Uuid,
  UuidOptional,
} from '../../../common/domain/value-object';
import { ContractInterface } from '../../domain/interfaces';
import { Contract } from '../../domain/contract';
import {
  ContractNumber,
  ContractStatus,
  ContractStartDate,
  ContractEndDate,
} from '../../domain/value-object';
import { ContractPrice } from '../../../contracts/domain/value-object/contract-price';
import { PayInInstallments } from '../../../contracts/domain/value-object/pay-in-installments/pay-in-installments';
import { CustomerPayments } from '../../../contracts/domain/value-object/customer-payments/customer-payments';
import { ContractPercentage } from '../../../contracts/domain/value-object/pay-in-installments/contract-percentage';
import { ContractDate } from '../../../contracts/domain/value-object/contract-date';
import { PayInInstallment } from '../../../contracts/domain/value-object/pay-in-installments/pay-in-installment';
import { CustomerPayment } from '../../../contracts/domain/value-object/customer-payments/customer-payment';
import { CustomerPaymentMethod } from '../../../contracts/domain/value-object/customer-payments/customer-payment-method';
import { ContractFolder } from '../../../contracts/domain/value-object/contract-folder';
import { CommandContractDetailsUpdater } from '../../../contract-detail/application/update/command/command-contract-updater';
import { ContractFinishClient } from '../../domain/value-object/contract-finish-client';
import { ContractReasonForCancellation } from '../../domain/value-object/reason-for-cancellation';
import { ContractIsPay } from '../../domain/value-object/pay-in-installments/contract-is-pay';
import { ContractFormat } from '../../domain/value-object/contract-format';
import { ContractEstimatedDate } from '../../domain/value-object/contract-estimated-date';

export class CommandContractUpdater {
  static execute(
    contract: ContractInterface,
    data?: ContractInterface,
  ): Contract {
    return new Contract(
      new Uuid(contract.id),
      new ContractFolder(data?.folder ?? contract.folder),
      new ContractNumber(data?.number ?? contract.number),
      new Uuid(data?.client ?? contract.client),
      new ContractStatus(
        new ContractStatusDetail(contract.status.petTravel),
        new ContractStatusDetail(contract.status.client),
      ),
      new ContractStartDate(data?.startDate ?? contract.startDate),
      new ContractEstimatedDate(data?.estimatedDate ?? contract.estimatedDate),
      new ContractEndDate(contract.endDate),
      CommandContractDetailsUpdater.execute(contract.details, data?.details),
      new ContractPrice(data?.price ?? contract.price),
      new PayInInstallments(
        data?.payInInstallments?.map(
          (_) =>
            new PayInInstallment(
              new ContractPrice(_.price),
              new ContractPercentage(_.percentage),
              new ContractDate(_.date),
              new ContractIsPay(_.isPay),
              new CustomerPayments(
                _?.customerPayments?.map(
                  (_) =>
                    new CustomerPayment(
                      new ContractPrice(_.price),
                      new CustomerPaymentMethod(_.method),
                      new ContractDate(_.date),
                    ),
                ) ?? [],
              ),
            ),
        ) ?? [],
      ),
      new Uuid(data?.adviser ?? contract.adviser),
      new ContractFinishClient(data?.finishClient ?? contract.finishClient),
      new ContractReasonForCancellation(
        data?.reasonForCancellation ?? contract?.reasonForCancellation ?? '',
      ),
      new ContractFormat(data?.format ?? contract.format),
      new UuidOptional(data?.user ?? contract.user),
    );
  }
}
