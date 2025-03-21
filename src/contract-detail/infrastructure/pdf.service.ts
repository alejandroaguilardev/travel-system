import { Injectable } from '@nestjs/common';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import { Uuid } from '../../common/domain/value-object/uuid';
import { RabiesSerologyPdf } from '../application/pdf/rabies-serology';
import { PDFDocumentService } from '../../common/infrastructure/services/pdf-document.service';
import { join } from 'path';
import { CDCRVMRPdf } from '../application/pdf/CDCRVMR-pdf';
import { AdendasPdf } from '../application/pdf/adendas-pdf';

@Injectable()
export class PdfService {


  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly dayJsService: DayJsService,
    private readonly pdfDocumentService: PDFDocumentService,
  ) { }


  async rabiesSerology(contractId: string, detailId: string, file: File) {
    const rabiesSerologyPdf = new RabiesSerologyPdf(
      this.mongoContractRepository,
      this.dayJsService,
      this.pdfDocumentService,
    );


    const { editedPdfBytes, name } = await rabiesSerologyPdf.execute(new Uuid(contractId), new Uuid(detailId), file);

    return { archive: editedPdfBytes, name };
  }

  async cdcrRvmr(contractId: string, detailId: string, file: File) {
    const cdcrRvmr = new CDCRVMRPdf(
      this.mongoContractRepository,
      this.dayJsService,
      this.pdfDocumentService,
    );

    const { editedPdfBytes, name } = await cdcrRvmr.execute(new Uuid(contractId), new Uuid(detailId), file);

    return { archive: editedPdfBytes, name };
  }

  async adendas(contractId: string, detailId: string, file: File, lang: string) {
    const adendas = new AdendasPdf(
      this.mongoContractRepository,
      this.dayJsService,
      this.pdfDocumentService,
    );

    const { editedPdfBytes, name } = await adendas.execute(new Uuid(contractId), new Uuid(detailId), file, lang);

    return { archive: editedPdfBytes, name };
  }


}
