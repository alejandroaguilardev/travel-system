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

  @Post(':id/cancel')
  @Auth()
  cancel(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.cancel(id, user);
  }

  @Get()
  @Auth()
  findAll(
    @Query() criteriaDto: CriteriaDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.findAll(criteriaDto, user);
  }

  @Get('client/:id')
  @Auth()
  findContractByClient(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.findContractByClient(id, user);
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

  @Delete(':id')
  @Auth()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.remove(id, user);
  }
}
