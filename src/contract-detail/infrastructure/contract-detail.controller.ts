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
  ParseUUIDPipe,
  UploadedFile,
  ParseFilePipe,
  UseInterceptors,
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
import { FastifyReply } from 'fastify';
import { NotificationDetailDto } from './dto/notification-detail.dto';
import {
  DocsDetailAccompanied,
  DocsDetailCage,
  DocsDetailDocumentation,
  DocsDetailFindAOne,
  DocsDetailPet,
  DocsDetailTravel,
  DocsDetailUpdateTopico,
  DocsNotificationDetail,
  DocsNotificationReVaccinationDetail,
  DocsNotificationTakingSample,
  DocsNotificationTravelDetail,
  DocsNotificationSenasaIntroduce,
  DocsDetailRemove,
  DocsNotificationTakingExecuted,
  DocsExcelCertificate,
  DocsExcelSenasaCertificate,
  DocsDetailCertificate,
} from './docs';
import { DocsRabiesSerology } from './docs/rabiesSeorology.docs';
import { PdfService } from './pdf.service';
import { FileInterceptor } from '@nest-lab/fastify-multer';

@Controller('contract-detail')
export class ContractDetailController {
  constructor(
    private readonly contractDetailService: ContractDetailService,
    private readonly contractDetailTopicoService: ContractDetailTopicoService,
    private readonly contractDetailCertificateService: ContractDetailCertificateService,
    private readonly pdfService: PdfService,
  ) { }

  @Get(':id/:detail')
  @Auth()
  @DocsDetailFindAOne()
  findOne(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.findOne(id, detail, user);
  }

  @Patch(':id/pet')
  @Auth()
  @DocsDetailPet()
  updatePet(
    @Param('id') id: string,
    @Body() petDetailDto: PetDetailDto,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.updatePet(id, petDetailDto, user);
  }

  @Patch(':id/:detail/accompanied')
  @Auth()
  @DocsDetailAccompanied()
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
  @DocsDetailDocumentation()
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
  @DocsDetailCage()
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
  @DocsDetailTravel()
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
  @DocsDetailUpdateTopico()
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

  @Post(':id/:detail/notificationDetail')
  @HttpCode(200)
  @Auth()
  @DocsNotificationDetail()
  mailDetail(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Body() { message = '' }: NotificationDetailDto,
  ) {
    return this.contractDetailTopicoService.mailDetail(
      id,
      detail,
      message,
    );
  }

  @Post(':id/:detail/notificationTopicRabiesReVaccination')
  @HttpCode(200)
  @Auth()
  @DocsNotificationReVaccinationDetail()
  mailTopicRabiesReVaccination(
    @Param('id') id: string,
    @Param('detail') detail: string,
  ) {
    return this.contractDetailTopicoService.mailTopicRabiesReVaccination(
      id,
      detail,
    );
  }

  @Post(':id/:detail/notificationTravelDetail')
  @HttpCode(200)
  @Auth()
  @DocsNotificationTravelDetail()
  mailTravelDetail(
    @Param('id') id: string,
    @Param('detail') detail: string,
  ) {
    return this.contractDetailTopicoService.mailTravelDetail(id, detail);
  }

  @Post(':id/:detail/notificationTakingSample')
  @HttpCode(200)
  @Auth()
  @DocsNotificationTakingSample()
  mailTakingSample(
    @Param('id') id: string,
    @Param('detail') detail: string,
  ) {
    return this.contractDetailTopicoService.mailTakingSample(id, detail);
  }

  @Post(':id/:detail/notificationTakingSampleExecuted')
  @HttpCode(200)
  @Auth()
  @DocsNotificationTakingExecuted()
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

  @Post(':id/:detail/notificationSenasaIntroduceContract')
  @HttpCode(200)
  @Auth()
  @DocsNotificationSenasaIntroduce()
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
  @DocsExcelSenasaCertificate()
  async downloadSenasaExcel(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @GetUser() user: UserWithoutWithRoleResponse,
    @Res() res: FastifyReply,
  ) {
    const { response, name } =
      await this.contractDetailCertificateService.senasaExcelDownload(
        id,
        detail,
        user,
      );

    res.header('Access-Control-Expose-Headers', 'name');
    res.header(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    res.header('Content-Disposition', `attachment; filename="${name}"`);
    res.header('name', name);
    res.send(response);
  }

  @HttpCode(200)
  @Post(':id/:detail/excel/certificate/:certificate')
  @Auth()
  @DocsExcelCertificate()
  async downloadCertificateExcel(
    @Param('id') id: string,
    @Param('detail') detail: string,
    @Param('certificate') certificate: string,
    @GetUser() user: UserWithoutWithRoleResponse,
    @Res() res: FastifyReply,
  ) {
    const { response, name } =
      await this.contractDetailCertificateService.certificateExcelDownload(
        id,
        detail,
        certificate,
        user,
      );

    res.header('Access-Control-Expose-Headers', 'name');
    res.header('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
    res.header('Content-Disposition', `attachment; filename="${name}"`);
    res.header('name', name);
    res.send(response);
  }

  @Patch(':id/:detail/certificate/:value')
  @Auth()
  @DocsDetailCertificate()
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
  @DocsDetailRemove()
  remove(
    @Param('id') id: string,
    @Param('detailId') detailId: string,
    @GetUser() user: UserWithoutWithRoleResponse,
  ) {
    return this.contractDetailService.remove(id, detailId, user);
  }

  @Auth()
  @DocsRabiesSerology()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("file"))
  @Post('/rabies-serology/:contractId/:detailId')
  async rabiesSerology(
    @Param('contractId', ParseUUIDPipe) contractId,
    @Param('detailId', ParseUUIDPipe) detailId,
    @UploadedFile() file: File,
    @Res() res: FastifyReply) {
    const { archive, name } = await this.pdfService.rabiesSerology(contractId, detailId, file);
    res
      .header('Access-Control-Expose-Headers', 'name')
      .header('Content-Disposition', `attachment; filename="${name}"`)
      .header('name', name)
      .header('Content-Type', 'application/pdf')
      .send(archive);
  }

  @Auth()
  @DocsRabiesSerology()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("file"))
  @Post('/cdcr-rvmr/:contractId/:detailId')
  async cdcrRvmr(
    @Param('contractId', ParseUUIDPipe) contractId,
    @Param('detailId', ParseUUIDPipe) detailId,
    @UploadedFile() file: File,
    @Res() res: FastifyReply) {
    const { archive, name } = await this.pdfService.cdcrRvmr(contractId, detailId, file);
    res
      .header('Access-Control-Expose-Headers', 'name')
      .header('Content-Disposition', `attachment; filename="${name}"`)
      .header('name', name)
      .header('Content-Type', 'application/pdf')
      .send(archive);
  }


  @Auth()
  @DocsRabiesSerology()
  @HttpCode(200)
  @UseInterceptors(FileInterceptor("file"))
  @Post('/adendas/:contractId/:detailId/:lang')
  async adendas(
    @Param('contractId', ParseUUIDPipe) contractId,
    @Param('detailId', ParseUUIDPipe) detailId,
    @Param('lang') lang,
    @UploadedFile() file: File,
    @Res() res: FastifyReply) {
    const { archive, name } = await this.pdfService.adendas(contractId, detailId, file, lang);
    res
      .header('Access-Control-Expose-Headers', 'name')
      .header('Content-Disposition', `attachment; filename="${name}"`)
      .header('name', name)
      .header('Content-Type', 'application/pdf')
      .send(archive);
  }
}
