import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
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

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Post()
  create(@Body() createContractDto: CreateContractDto) {
    return this.contractsService.create(createContractDto);
  }
  @Post(':id/finish')
  finish(@Param('id') id: string) {
    return this.contractsService.finish(id);
  }

  @Get()
  findAll(@Query() criteriaDto: CriteriaDto) {
    return this.contractsService.findAll(criteriaDto);
  }

  @Get('client/:id')
  findContractByClient(@Param('id') id: string) {
    return this.contractsService.findContractByClient(id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.contractsService.findOne(id);
  }

  @Patch(':id/documentation/client')
  updateDocumentation(
    @Param('id') id: string,
    @Body() documentationDto: DocumentationDto,
  ) {
    return this.contractsService.updateDocumentation(id, documentationDto);
  }

  @Patch(':id/cage/client')
  updateCage(@Param('id') id: string, @Body() cageDto: CageDto) {
    return this.contractsService.updateCage(id, cageDto);
  }

  @Patch(':id/travel/client')
  updateTravel(@Param('id') id: string, @Body() travelDto: TravelDto) {
    return this.contractsService.updateTravel(id, travelDto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateContractDto: UpdateContractDto,
  ) {
    return this.contractsService.update(id, updateContractDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.contractsService.remove(id);
  }
}
