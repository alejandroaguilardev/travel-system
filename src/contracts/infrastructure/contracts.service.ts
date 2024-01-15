import { Injectable } from '@nestjs/common';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { MongoContractRepository } from './persistence/contract-mongo.repository';
import { ResponseSuccess } from '../../common/domain/response/response-success';
import { ContractCreator } from '../application/create/contract-creator';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { ContractSearch } from '../application/search/contract-search';
import { ContractSearchById } from '../application/search-by-id/contract-search-by-id';
import { ContractUpdater } from '../application/update/contract-updater';
import { ContractRemover } from '../application/remove/contract-remover';
import { ResponseSearch } from '../../common/domain/response/response-search';
import { ContractResponse } from '../application/response/contract.response';

@Injectable()
export class ContractsService {
  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
  ) {}

  create(createContractDto: CreateContractDto): Promise<ResponseSuccess> {
    const contractsCreator = new ContractCreator(this.mongoContractRepository);
    return contractsCreator.execute(createContractDto);
  }

  findAll(criteriaDto: CriteriaDto): Promise<ResponseSearch<ContractSearch>> {
    const contractSearch = new ContractSearch(this.mongoContractRepository);
    return contractSearch.execute(criteriaDto);
  }

  findOne(id: string): Promise<ContractResponse> {
    const contractSearchById = new ContractSearchById(
      this.mongoContractRepository,
    );
    return contractSearchById.execute(id);
  }

  update(
    id: string,
    updateContractDto: UpdateContractDto,
  ): Promise<ResponseSuccess> {
    const contractUpdater = new ContractUpdater(this.mongoContractRepository);
    return contractUpdater.execute(id, updateContractDto);
  }

  remove(id: string): Promise<ResponseSuccess> {
    const contractRemover = new ContractRemover(this.mongoContractRepository);
    return contractRemover.execute(id);
  }
}
