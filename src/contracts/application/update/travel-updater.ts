import { Uuid } from '../../../common/domain/value-object/uuid';
import { ErrorNotFound } from '../../../common/domain/errors/error-not-found';
import { ContractRepository } from '../../domain/contract.repository';
import { TravelDefinition } from '../../domain/interfaces/travel';
import { ContractFactory } from '../../domain/factory/contract.factory';
import { Contract } from '../../domain/contract';
import { ContractTravel } from '../../domain/value-object/services/service-travel';
import { ContractResponse } from '../response/contract.response';

export class ContractTravelUpdater {
  constructor(private readonly contractRepository: ContractRepository) {}

  async execute(
    contractId: string,
    travelRequest: TravelDefinition,
  ): Promise<ContractResponse> {
    const uuid = new Uuid(contractId);

    let contract =
      await this.contractRepository.searchById<ContractResponse>(uuid);

    if (!contract) {
      throw new ErrorNotFound(ErrorNotFound.messageDefault());
    }

    Contract.statusError(contract.status);

    contract = ContractTravel.setAirlineReservation(contract, travelRequest);
    contract = Contract.establishedStatus(contract);

    const contractUpdated = ContractFactory.converter(contract);
    await this.contractRepository.update(uuid, contractUpdated);
    return contractUpdated.toJson();
  }
}
