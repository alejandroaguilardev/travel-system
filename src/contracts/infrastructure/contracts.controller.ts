import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { CreateContractDto } from './dto/create-contract.dto';
import { UpdateContractDto } from './dto/update-contract.dto';
import { CriteriaDto } from '../../common/infrastructure/dto/criteria.dto';
import { DocumentationDto } from './dto/documentation.dto';
import { CageDto } from './dto/cage.dto';
import { TravelDto } from './dto/travel.dto';
import { Auth } from '../../auth/infrastructure/decorator/auth.decorator';
import { GetUser } from '../../auth/infrastructure/decorator/get-user.decorator';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';

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

  @Get(':id')
  @Auth()
  findOne(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.findOne(id, user);
  }

  @Patch(':id/documentation')
  @Auth()
  updateDocumentation(
    @Param('id') id: string,
    @Body() documentationDto: DocumentationDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.updateDocumentation(
      id,
      documentationDto,
      user,
    );
  }

  @Patch(':id/cage')
  @Auth()
  updateCage(
    @Param('id') id: string,
    @Body() cageDto: CageDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.updateCage(id, cageDto, user);
  }

  @Patch(':id/travel')
  @Auth()
  updateTravel(
    @Param('id') id: string,
    @Body() travelDto: TravelDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.updateTravel(id, travelDto, user);
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

  @Delete(':id')
  @Auth()
  remove(
    @Param('id') id: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractsService.remove(id, user);
  }
}
