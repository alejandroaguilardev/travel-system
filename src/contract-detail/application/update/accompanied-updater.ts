import { Uuid } from '../../../common/domain/value-object/uuid';
import { ContractDetailRepository } from '../../domain/contract-detail.repository';
import { UserWithoutWithRoleResponse } from '../../../users/domain/interfaces/user-without.response';
import { AuthPermission } from '../../../common/domain/auth-permissions';
import { ContractDetailUpdaterResponse } from '../response/contract-detail-update.response';
import { ContractRepository } from '../../../contracts/domain/contract.repository';
import { CommandContractUpdater } from '../../../contracts/application/update/command-contract-updater';
import { EnsureContractDetail } from './ensure-contract-detail';
import { TravelPetPerChargeInterface } from 'src/contract-detail/domain/interfaces';
import {
  TravelDestinationInterface,
  TravelAccompaniedPetInterface,
} from 'src/contract-detail/domain/interfaces/travel.interface';
import { TravelAccompaniedPet } from '../../domain/value-object/travel/accompanied-pet/travel-accompanied-pet';
import { TravelDestination } from '../../domain/value-object/travel/destination/travel-destination';
import { TravelPetPerCharge } from '../../domain/value-object/travel/travel-pet-per-charge';
import { CommandContractTravel } from './command/command-travel';

export interface TravelAccompaniedRequest {
  destination: TravelDestinationInterface;
  petPerCharge: TravelPetPerChargeInterface;
  accompaniedPet: TravelAccompaniedPetInterface;
}

export class ContractDetailAccompaniedUpdater {
  constructor(
    private readonly contractRepository: ContractRepository,
    private readonly contractDetailRepository: ContractDetailRepository,
  ) {}

  async execute(
    contractId: string,
    contractDetailId: string,
    accompaniedPet: TravelAccompaniedPet,
    destination: TravelDestination,
    petPerCharge: TravelPetPerCharge,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractUuid = new Uuid(contractId);
    const contractDetailUuid = new Uuid(contractDetailId);

    const ensureContractDetail = new EnsureContractDetail(
      this.contractRepository,
      this.contractDetailRepository,
    );
    const { contractResponse, contractDetailResponse, detailsResponse } =
      await ensureContractDetail.searchEnsure(contractUuid, contractDetailUuid);

    ensureContractDetail.hasPermission(
      user,
      contractResponse,
      AuthPermission.CAGE,
    );
    const contract = CommandContractUpdater.execute(contractResponse);
    contract.status.statusError(contract.endDate.value);

    const travel = CommandContractTravel.execute({
      ...contractDetailResponse.travel,
      accompaniedPet: accompaniedPet.toJson(),
      destination: destination.toJson(),
      petPerCharge: petPerCharge.toJson(),
    });
    const contractDetail = {
      ...contractDetailResponse,
      travel: travel.toJson(),
    };

    contract.establishedStatus(
      detailsResponse.map((_) => {
        if (_.id === contractDetail.id) {
          return contractDetail as any;
        }
        return _;
      }),
    );

    await Promise.all([
      this.contractDetailRepository.updateTravel(contractDetailUuid, travel),
      this.contractRepository.update(contractUuid, contract),
    ]);

    return {
      contract: contract.toJson(),
      contractDetail: {
        ...contractDetail,
        pet: detailsResponse.find((d) => d.pet.id === contractDetail.pet).pet,
      },
    };
  }
}
