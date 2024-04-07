import { Uuid, UuidOptional } from '../../../common/domain/value-object';
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
      new ContractStatus(contract.status),
      new ContractStartDate(data?.startDate ?? contract.startDate),
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
            ),
        ) ?? [],
      ),
      new CustomerPayments(
        data?.customerPayments?.map(
          (_) =>
            new CustomerPayment(
              new ContractPrice(_.price),
              new CustomerPaymentMethod(_.method),
              new ContractDate(_.date),
            ),
        ) ?? [],
      ),
      new Uuid(data?.adviser ?? contract.adviser),
      new ContractFinishClient(data?.finishClient ?? contract.finishClient),
      new UuidOptional(data?.user ?? contract.user),
    );
  }
}
