import { ResponseMessage } from '../../../common/domain/response/response-message';
import { ResponseSuccess } from '../../../common/domain/response/response-success';
import { ContractRepository } from '../../domain/contract.repository';
import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractResponse } from '../response/contract.response';
import { ErrorInvalidadArgument } from '../../../common/domain/errors/error-invalid-argument';
import { ContractEndDate } from '../../domain/value-object/contract-end-date';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';

export class ContractFinish {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(contractId: string): Promise<ResponseSuccess> {
    const uuid = new Uuid(contractId);
    const response =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!response) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    if (response.status !== 'completed') {
      throw new ErrorInvalidadArgument(ContractFinish.messageNotCompleted());
    }
    const endDate = new ContractEndDate(new Date());

    await this.contractRepository.finish(uuid, endDate);

    return ResponseMessage.createSuccessResponse(
      ContractFinish.messageSuccess(),
    );
  }

  static messageSuccess() {
    return 'El contrato finalizo con éxito';
  }

  static messageNotCompleted() {
    return 'El contrato no esta completado';
  }
}
