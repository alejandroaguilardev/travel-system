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

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  @Auth()
  create(
    @Body() createContractDto: CreateContractDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.create(createContractDto, user);
  }

  @Post(':id/finish')
  @Auth()
  finish(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.finish(id, user);
  }
  @Post(':id/finish/client')
  @Auth()
  finishClient(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.finishClient(id, user);
  }

  @Post(':id/cancel')
  @Auth()
  cancel(
    @Param('id') id: string,
    @Body() contractCancelDto: ContractCancelDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.cancel(id, contractCancelDto, user);
  }

  @Get()
  @Auth()
  findAll(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.findAll(criteriaDto, user);
  }

  @Get('client/pending')
  @Auth()
  findContractByClient(@GetUser() user: UserWithoutWithRoleResponse) {
    return this.contractsService.findContractByClient(user);
  }

  @Get('client')
  @Auth()
  findAllByClient(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.findAllClient(criteriaDto, user);
  }

  @Get(':id')
  @Auth()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.findOne(id, user);
  }

  @Put(':id')
  @Auth()
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.update(id, updateContractDto, user);
  }

  @Patch(':id/folder')
  @Auth()
  updateFolder(
    @Param('id') id: string,
    @Body() folderContractDto: FolderContractDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.updateFolder(id, folderContractDto, user);
  }

  @Patch(':id/payment')
  @Auth()
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
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.remove(id, user);
  }
}
