import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  HttpCode,
} from '@nestjs/common';
import { ContractDetailService } from './contract-detail.service';
import { Auth } from '../../auth/infrastructure/decorator/auth.decorator';
import { GetUser } from '../../auth/infrastructure/decorator/get-user.decorator';
import { UserWithoutWithRoleResponse } from '../../users/domain/interfaces/user-without.response';
import {
  CageDto,
  DocumentationDto,
  TravelDto,
  TravelAccompaniedDto,
  PetDetailDto,
} from './dto';
import { ContractDetailTopicoService } from './contract-detail-topico.service';
import { TopicoDto } from './dto/topico/topico.dto';
import { ContractDetailCertificateService } from './contract-detail-certificate.service';

@Controller('contract-detail')
export class ContractDetailController {
  constructor(
    private readonly contractDetailService: ContractDetailService,
    private readonly contractDetailTopicoService: ContractDetailTopicoService,
    private readonly contractDetailCertificateService: ContractDetailCertificateService,
  ) {}

  @Get(':id/:detail')
  @Auth()
  findOne(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.findOne(id, detail, user);
  }

  @Patch(':id/pet')
  @Auth()
  updatePet(
    @Param('id') id: string,
    @Body() petDetailDto: PetDetailDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.updatePet(id, petDetailDto, user);
  }

  @Patch(':id/:detail/accompanied')
  @Auth()
  updateAccompanied(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Body() travelAccompaniedDto: TravelAccompaniedDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.updateAccompanied(
      id,
      detail,
      travelAccompaniedDto,
      user,
    );
  }

  @Patch(':id/:detail/documentation')
  @Auth()
  updateDocumentation(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Body() documentationDto: DocumentationDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.updateDocumentation(
      id,
      detail,
      documentationDto,
      user,
    );
  }

  @Patch(':id/:detail/cage')
  @Auth()
  updateCage(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Body() cageDto: CageDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.updateCage(id, detail, cageDto, user);
  }

  @Patch(':id/:detail/travel')
  @Auth()
  updateTravel(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Body() travelDto: TravelDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.updateTravel(id, detail, travelDto, user);
  }

  @Patch(':id/:detail/topico/:value')
  @Auth()
  updateTopico(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Param('value') value: string,
    @Body() topicoDto: TopicoDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailTopicoService.updateTopico(
      id,
      detail,
      value,
      topicoDto,
      user,
    );
  }

  @Post(':id/:detail/measurementsAndWeightMail')
  @HttpCode(200)
  @Auth()
  updateMeasurementsAndWeightMail(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailTopicoService.updateMeasurementMail(
      id,
      detail,
      user,
    );
  }

  @Patch(':id/:detail/certificate/:value')
  @Auth()
  updateCertificate(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Param('value') value: string,
    @Body() documentationDto: DocumentationDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailCertificateService.updateCertificate(
      id,
      detail,
      value,
      documentationDto,
      user,
    );
  }

  @Delete(':id/:detailId')
  @Auth()
  remove(
    @Param('id') id: string,
    @Param('detailId') detailId: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.remove(id, detailId, user);
  }
}
