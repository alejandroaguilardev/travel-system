import { Injectable } from '@nestjs/common';
import { CageDto, DocumentationDto, PetDetailDto } from './dto';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { ResponseSuccess } from '../../common/domain/response';
import { ContractDetailSearchById } from '../application/search-by-id/contract-detail-search-by-id';
import { TravelDto } from '../../contract-detail/infrastructure/dto';
import {
  CommandContractCage,
  CommandContractDocumentation,
  CommandContractTravel,
  ContractDetailCageUpdater,
  ContractDetailDocumentationUpdater,
  ContractDetailTravelUpdater,
} from '../application/update';
import { ContractDetailUpdaterResponse } from '../application/response/contract-detail-update.response';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { ContractDetailRemover } from '../application/remove/contract-detail-remover';
import { MailContractService } from '../../mail/infrastructure/mail-contract.service';
import { TravelAccompaniedDto } from './dto/acompanied.dto';
import { ContractDetailAccompaniedUpdater } from '../application/update/accompanied-updater';
import { ContractDetailInterface } from '../domain/interfaces';
import { ContractDetailPetUpdater } from '../application/pet/contract-detail-pet-updater';

@Injectable()
export class ContractDetailService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly mailerService: MailContractService,
  ) {}

  findOne(
    contractId: string,
    contractDetailId: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailInterface> {
    const contractSearchById = new ContractDetailSearchById(
      this.mongoContractRepository,
    );
    return contractSearchById.execute(contractId, contractDetailId, user);
  }

  updatePet(
    contractId: string,
    petDetailDto: PetDetailDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractDetailPetUpdater = new ContractDetailPetUpdater(
      this.mongoContractRepository,
    );
    return contractDetailPetUpdater.execute(contractId, petDetailDto, user);
  }

  updateAccompanied(
    contractId: string,
    contractDetailId: string,
    travelAccompaniedDto: TravelAccompaniedDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractDetailAccompaniedUpdater =
      new ContractDetailAccompaniedUpdater(this.mongoContractRepository);
    const accompaniedPet = CommandContractTravel.travelAccompaniedPet(
      travelAccompaniedDto.accompaniedPet,
    );
    const destination = CommandContractTravel.travelDestination(
      travelAccompaniedDto.destination,
    );
    const petPerCharge = CommandContractTravel.travelPetPerCharge(
      travelAccompaniedDto.petPerCharge,
    );

    return contractDetailAccompaniedUpdater.execute(
      contractId,
      contractDetailId,
      accompaniedPet,
      destination,
      petPerCharge,
      user,
    );
  }

  async updateDocumentation(
    contractId: string,
    contractDetailId: string,
    documentationDto: DocumentationDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractDocumentationUpdater = new ContractDetailDocumentationUpdater(
      this.mongoContractRepository,
    );

    const documentation =
      CommandContractDocumentation.execute(documentationDto);

    const response = await contractDocumentationUpdater.execute(
      contractId,
      contractDetailId,
      documentation,
      user,
    );

    this.mailerService.updateDocumentation(response);
    if (
      documentationDto.rabiesSeroLogicalTest.isApplied &&
      !documentationDto.rabiesSeroLogicalTest.resultDate
    ) {
      this.mailerService.travelPersonContract(response);
    }

    return response;
  }

  updateCage(
    contractId: string,
    contractDetailId: string,
    cageDto: CageDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractDocumentationUpdater = new ContractDetailCageUpdater(
      this.mongoContractRepository,
    );
    const cage = CommandContractCage.execute(cageDto);
    return contractDocumentationUpdater.execute(
      contractId,
      contractDetailId,
      cage,
      user,
    );
  }

  updateTravel(
    contractId: string,
    contractDetailId: string,
    travelDto: TravelDto,
    user: UserWithoutWithRoleResponse,
  ): Promise<ContractDetailUpdaterResponse> {
    const contractTravelUpdater = new ContractDetailTravelUpdater(
      this.mongoContractRepository,
    );
    const travel = CommandContractTravel.execute(travelDto);
    return contractTravelUpdater.execute(
      contractId,
      contractDetailId,
      travel,
      user,
    );
  }

  remove(
    id: string,
    detailId: string,
    user: UserWithoutWithRoleResponse,
  ): Promise<ResponseSuccess> {
    const contractRemover = new ContractDetailRemover(
      this.mongoContractRepository,
    );
    return contractRemover.execute(id, detailId, user);
  }
}
