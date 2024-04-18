import { ContractRepository } from '../../domain/contract.repository';
import { CommandCriteria } from '../../../common/application/criteria/command-criteria';

import { ContractResponse } from '../response/contract.response';
import { DateService } from '../../../common/application/services/date-service';
import { CriteriaRequest } from '../../../common/application/criteria/criteria';

export class ContractSearchPayments {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly dayService: DateService,
  ) {}

  async execute(): Promise<ContractResponse[]> {
    const criteria = CommandCriteria.fromData(this.criteria());

    const contracts =
      await this.contractRepository.searchPaymentsMissing(criteria);
    return this.filterPayInInstallmentsNotPay(contracts);
  }

  filterPayInInstallmentsNotPay(
    contracts: ContractResponse[],
  ): ContractResponse[] {
    return contracts.filter((contract) => {
      return contract.payInInstallments.some(
        (payInInstallment) =>
          !payInInstallment.isPay &&
          (this.dayService.isSame(payInInstallment.date) ||
            this.dayService.isBefore(payInInstallment.date)),
      );
    });
  }

  criteria(): Partial<CriteriaRequest> {
    return {
      filters: [
        { field: 'status', operator: 'CONTAINS', value: 'pending' },
        { field: 'status', operator: 'CONTAINS', value: 'pending' },
      ],
    };
  }
}
