import { Module } from '@nestjs/common';
import { ContractDetailService } from './contract-detail.service';
import { ContractDetailController } from './contract-detail.controller';
import { AuthModule } from '../../auth/infrastructure/auth.module';
import { ContractsModule } from '../../contracts/infrastructure/contracts.module';
import { ContractDetailTopicoService } from './contract-detail-topico.service';
import { ContractDetailCertificateService } from './contract-detail-certificate.service';
import { UbigeoModule } from '../../ubigeo/infrastructure/ubigeo.module';
import { JWTAdapterService } from '../../auth/infrastructure/services/jwt.service';
import { LaravelApiAdapter } from '../../common/infrastructure/services/laravel-adapter.service';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { PetsModule } from '../../pets/infrastructure/pets.module';
import { PdfService } from './pdf.service';
import { PDFDocumentService } from '../../common/infrastructure/services/pdf-document.service';

@Module({
  imports: [
    AuthModule, ContractsModule, UbigeoModule, PetsModule],
  controllers: [ContractDetailController],
  providers: [
    ContractDetailService,
    ContractDetailTopicoService,
    ContractDetailCertificateService,
    JWTAdapterService,
    LaravelApiAdapter,
    DayJsService,
    PdfService,
    PDFDocumentService,
  ],
  exports: [ContractDetailService],
})
export class ContractDetailModule { }
