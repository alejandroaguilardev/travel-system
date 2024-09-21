import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  Patch,
  HttpCode,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { Auth } from '../../auth/infrastructure/decorator/auth.decorator';
import { GetUser } from '../../auth/infrastructure/decorator/get-user.decorator';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import { FolderContractDto } from './dto/folder-contract-dto';
import { ContractCancelDto } from './dto/contract-cancel.dto';
import { PayInInstallmentArrayDto } from './dto/pay-installment.dto';
import {
  DocsContractCancel,
  DocsContractClientAll,
  DocsContractCreate,
  DocsContractFindAOne,
  DocsContractFindAll,
  DocsContractFinish,
  DocsContractFinishClient,
  DocsContractFolder,
  DocsContractPayment,
  DocsContractRemove,
  DocsContractUpdate,
} from './docs';
import { DocsContractClientFindAll } from './docs/contract-client.docs';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) { }

  @Post()
  @Auth()
  @DocsContractCreate()
  create(
    @Body() createContractDto: CreateContractDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.create(createContractDto, user);
  }

  @Post(':id/finish')
  @HttpCode(200)
  @Auth()
  @DocsContractFinish()
  finish(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.finish(id, user);
  }

  @Post(':id/finish/client')
  @HttpCode(200)
  @Auth()
  @DocsContractFinishClient()
  finishClient(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.finishClient(id, user);
  }

  @Post(':id/cancel')
  @HttpCode(200)
  @Auth()
  @DocsContractCancel()
  cancel(
    @Param('id') id: string,
    @Body() contractCancelDto: ContractCancelDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.cancel(id, contractCancelDto, user);
  }

  @Post(':id/notification-new-contract')
  @HttpCode(200)
  @Auth()
  @DocsContractCancel()
  notificationNewContract(
    @Param('id') id: string,
  ) {
    return this.contractsService.notificationNewContract(id);
  }

  @Get()
  @Auth()
  @DocsContractFindAll()
  findAll(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.findAll(criteriaDto, user);
  }

  @Get('client/pending')
  @Auth()
  @DocsContractClientAll()
  findContractByClient(@GetUser() user: UserWithoutWithRoleResponse) {
    return this.contractsService.findContractByClient(user);
  }

  @Get('client')
  @Auth()
  @DocsContractClientFindAll()
  findAllByClient(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.findAllClient(criteriaDto, user);
  }

  @Get(':id')
  @Auth()
  @DocsContractFindAOne()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.findOne(id, user);
  }

  @Put(':id')
  @Auth()
  @DocsContractUpdate()
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.update(id, updateContractDto, user);
  }

  @Patch(':id/folder')
  @Auth()
  @DocsContractFolder()
  updateFolder(
    @Param('id') id: string,
    @Body() folderContractDto: FolderContractDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.updateFolder(id, folderContractDto, user);
  }

  @Patch(':id/payment')
  @Auth()
  @DocsContractPayment()
  updatePayment(
    @Param('id') id: string,
    @Body() payInInstallmentArrayDto: PayInInstallmentArrayDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.updatePayInInstallment(
      id,
      payInInstallmentArrayDto,
      user,
    );
  }

  @Delete(':id')
  @Auth()
  @DocsContractRemove()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.remove(id, user);
  }

}
