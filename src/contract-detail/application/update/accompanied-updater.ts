import { Uuid } from '../../../common/domain/value-object/uuid';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { AuthGroup, AuthPermission } from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';
import { EnsureContractDetail } from './ensure-contract-detail';
import { TravelPetPerChargeInterface } from '../../../contract-detail/domain/interfaces';
import {
  TravelDestinationInterface,
  TravelAccompaniedPetInterface,
} from '../../..//contract-detail/domain/interfaces/travel.interface';
import { TravelAccompaniedPet } from '../../domain/value-object/travel/accompanied-pet/travel-accompanied-pet';
import { TravelDestination } from '../../domain/value-object/travel/destination/travel-destination';
import { TravelPetPerCharge } from '../../domain/value-object/travel/travel-pet-per-charge';
import { CommandContractTravel } from './command/command-travel';
import { TravelObservation } from '../../domain/value-object/travel/travel-observation';

export interface TravelAccompaniedRequest {
  destination: TravelDestinationInterface;
  petPerCharge: TravelPetPerChargeInterface;
  accompaniedPet: TravelAccompaniedPetInterface;
  observation: string;
}

export class ContractDetailAccompaniedUpdater {
  constructor(private readonly contractRepository: ContractRepository) { }

  async execute(
    contractId: string,
    contractDetailId: string,
    accompaniedPet: TravelAccompaniedPet,
    destination: TravelDestination,
    petPerCharge: TravelPetPerCharge,
    observation: TravelObservation,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractUuid = new Uuid(contractId);
    const contractDetailUuid = new Uuid(contractDetailId);

    const ensureContractDetail = new EnsureContractDetail(
      this.contractRepository,
    );
    const { contractResponse, contractDetailResponse } =
      await ensureContractDetail.searchEnsure(contractUuid, contractDetailUuid);

    ensureContractDetail.hasPermission(
      user,
      contractResponse,
      AuthPermission.EXECUTE,
      AuthGroup.CONTRACT_TRAVEL,
    );

    const travel = CommandContractTravel.execute({
      ...contractDetailResponse.travel,
      accompaniedPet: accompaniedPet.toJson(),
      destination: destination.toJson(),
      petPerCharge: petPerCharge.toJson(),
      observation: observation.value,
    });

    const contractDetail = {
      ...contractDetailResponse,
      travel: travel.toJson(),
    };

    contractDetail.travel.status = travel.statusCompleted(
      contractDetail.travel,
    );

    const contract = CommandContractUpdater.execute({
      ...contractResponse,
      details: contractResponse.details.map((_) =>
        _.id === contractDetail.id ? contractDetail : _,
      ),
    });
    contract.status.petTravel.statusError(contract.endDate.value);

    contract.establishedStatus();

    await this.contractRepository.update(contractUuid, contract);

    const response =
      await this.contractRepository.searchByIdWithPet(contractUuid);

    return {
      contract: response,
      contractDetail: response.details.find((_) => _.id === contractDetail.id),
    };
  }
}
