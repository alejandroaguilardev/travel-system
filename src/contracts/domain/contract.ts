import { Uuid, UuidOptional } from '../../common/domain/value-object';
import { ContractInterface } from './interfaces';
import {
  ContractNumber,
  ContractStatus,
  ContractStartDate,
  ContractEndDate,
} from './value-object';
import { ContractPrice } from './value-object/contract-price';
import { PayInInstallments } from './value-object/pay-in-installments/pay-in-installments';
import { ContractFolder } from './value-object/contract-folder';
import { ContractDetail } from '../../contract-detail/domain/contract-detail';
import { ContractFinishClient } from './value-object/contract-finish-client';
import { ContractReasonForCancellation } from './value-object/reason-for-cancellation';
import { ContractFormat } from './value-object/contract-format';
import { ContractEstimatedDate } from './value-object/contract-estimated-date';

export class Contract {
  constructor(
    readonly id: Uuid,
    readonly folder: ContractFolder,
    readonly number: ContractNumber,
    readonly client: Uuid,
    public status: ContractStatus,
    readonly startDate: ContractStartDate,
    readonly estimatedDate: ContractEstimatedDate,
    public endDate: ContractEndDate,
    public details: ContractDetail[],
    readonly price: ContractPrice,
    readonly payInInstallments: PayInInstallments,
    readonly adviser: Uuid,
    readonly finishClient: ContractFinishClient,
    readonly reasonForCancellation: ContractReasonForCancellation,
    readonly format: ContractFormat,
    readonly user: UuidOptional,
  ) { }

  toJson(): ContractInterface {
    return {
      id: this.id.value,
      folder: this.folder.value,
      number: this.number.value,
      client: this.client.value,
      status: this.status.toJson(),
      startDate: this.startDate.value,
      estimatedDate: this.estimatedDate.value,
      details: this.details.map((_) => _.toJson()),
      endDate: this.endDate.value,
      price: this.price.value,
      payInInstallments: this.payInInstallments.toJson(),
      adviser: this.adviser.value,
      finishClient: this.finishClient.value,
      reasonForCancellation: this.reasonForCancellation.value,
      format: this.format.value,
      user: this.user.value,
    };
  }

  establishedStatus() {
    const details = this.details.map((_) => _.toJson());
    let count = 0;
    let countHasCompleted = 0;
    details.forEach((detail) => {
      const hasCompleted = detail.documentation.status === 'completed';
      count += 1;
      countHasCompleted += hasCompleted ? 1 : 0;
      // Para no romper los contratos antiguos
      if (detail.topico.status) {
        const hasCompletedTopic = detail.topico.status === 'completed';
        count += 1;
        countHasCompleted += hasCompletedTopic ? 1 : 0;
      }
    });

    if (count === countHasCompleted) {
      this.status.petTravel.value = 'completed';
    } else if (countHasCompleted > 0) {
      this.status.petTravel.value = 'in-process';
    } else {
      this.status.petTravel.value = 'pending';
    }

    this.establishedClientStatus()
  }
  establishedClientStatus() {
    const details = this.details.map((_) => _.toJson());
    let count = 0;
    let countHasCompleted = 0;
    details.forEach((detail) => {
      const hasCompleted =
        detail.documentation.status === 'completed' &&
        detail.cage.status === 'completed' &&
        detail.travel.status === 'completed';
      count += 1;
      countHasCompleted += hasCompleted ? 1 : 0;
    });

    if (count === countHasCompleted) {
      this.status.client.value = 'completed';
    } else if (countHasCompleted > 0) {
      this.status.client.value = 'in-process';
    } else {
      this.status.client.value = 'pending';
    }
  }
}
