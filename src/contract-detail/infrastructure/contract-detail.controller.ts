import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  HttpCode,
  Res,
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
import { Response } from 'express';
import { MailDetailDto } from './dto/mail-detail.dto';

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

  @Post(':id/:detail/mailDetail')
  @HttpCode(200)
  @Auth()
  mailDetail(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Body() { message = '' }: MailDetailDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailTopicoService.mailDetail(
      id,
      detail,
      message,
      user,
    );
  }

  @Post(':id/:detail/mailTopicRabiesReVaccination')
  @HttpCode(200)
  @Auth()
  mailTopicRabiesReVaccination(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailTopicoService.mailTopicRabiesReVaccination(
      id,
      detail,
      user,
    );
  }

  @Post(':id/:detail/mailTravelDetail')
  @HttpCode(200)
  @Auth()
  mailTravelDetail(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailTopicoService.mailTravelDetail(id, detail, user);
  }

  @Post(':id/:detail/mailTakingSample')
  @HttpCode(200)
  @Auth()
  mailTakingSample(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailTopicoService.mailTakingSample(id, detail, user);
  }

  @Post(':id/:detail/mailTakingSampleExecuted')
  @HttpCode(200)
  @Auth()
  mailTakingSampleExecuted(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailTopicoService.mailTakingSampleExecuted(
      id,
      detail,
      user,
    );
  }

  @Post(':id/:detail/mailSenasaIntroduceContract')
  @HttpCode(200)
  @Auth()
  senasaIntroduceContract(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailCertificateService.senasaIntroduceContract(
      id,
      detail,
      user,
    );
  }

  @Post(':id/:detail/excel/senasa')
  @Auth()
  async downloadSenasaExcel(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
    @Res() res: Response,
  ) {
    const { response, name } =
      await this.contractDetailCertificateService.senasaExcelDownload(
        id,
        detail,
        user,
      );
    response.pipe(res);
    res.header('Access-Control-Expose-Headers', 'name');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.setHeader('name', name);
    return response;
  }

  @Post(':id/:detail/excel/certificate/:certificate')
  @Auth()
  async downloadCertificateExcel(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Param('certificate') certificate: string,
    @GetUser() user: UserWithoutWithRoleResponse,
    @Res() res: Response,
  ) {
    const { response, name } =
      await this.contractDetailCertificateService.certificateExcelDownload(
        id,
        detail,
        certificate,
        user,
      );

    response.pipe(res);
    res.header('Access-Control-Expose-Headers', 'name');
    res.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
    res.setHeader('name', name);
    return response;
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
