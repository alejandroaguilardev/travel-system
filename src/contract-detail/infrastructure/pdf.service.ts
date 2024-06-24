import { Injectable } from '@nestjs/common';
import { DayJsService } from '../../common/infrastructure/services/dayjs.service';
import { MongoContractRepository } from '../../contracts/infrastructure/persistence/contract-mongo.repository';
import * as fs from 'fs/promises';
import { Uuid } from '../../common/domain/value-object/uuid';
import { RabiesSerologyPdf } from '../application/pdf/rabies-serology';
import { PDFDocumentService } from '../../common/infrastructure/services/pdf-document.service';
import { join } from 'path';
import { CDCRVMRPdf } from '../application/pdf/CDCRVMR-pdf';
import { UbigeoQuery } from '../../ubigeo/infrastructure/ubigeo-query.service';

@Injectable()
export class PdfService {
  private readonly PATH = "src/contract-detail/domain/pdf";


  constructor(
    private readonly mongoContractRepository: MongoContractRepository,
    private readonly dayJsService: DayJsService,
    private readonly pdfDocumentService: PDFDocumentService,
  ) { }


  async rabiesSerology(contractId: string, detailId: string) {
    const rabiesSerologyPdf = new RabiesSerologyPdf(
      this.mongoContractRepository,
      this.dayJsService,
      this.pdfDocumentService,
    );

    const originalFilePath = join(process.cwd(), this.PATH, rabiesSerologyPdf.FILENAME);
    const outputFilePath = join(process.cwd(), this.PATH, `edited_${rabiesSerologyPdf.FILENAME}`);

    const { editedPdfBytes, name } = await rabiesSerologyPdf.execute(new Uuid(contractId), new Uuid(detailId), originalFilePath);
    await fs.writeFile(outputFilePath, Buffer.from(editedPdfBytes, 'base64'));

    return { archive: editedPdfBytes, name };
  }

  async cdcrRvmr(contractId: string, detailId: string) {
    const rabiesSerologyPdf = new CDCRVMRPdf(
      this.mongoContractRepository,
      this.dayJsService,
      this.pdfDocumentService,
    );

    const originalFilePath = join(process.cwd(), this.PATH, rabiesSerologyPdf.FILENAME);
    const outputFilePath = join(process.cwd(), this.PATH, `edited_${rabiesSerologyPdf.FILENAME}`);

    const { editedPdfBytes, name } = await rabiesSerologyPdf.execute(new Uuid(contractId), new Uuid(detailId), originalFilePath);
    await fs.writeFile(outputFilePath, Buffer.from(editedPdfBytes, 'base64'));

    return { archive: editedPdfBytes, name };
  }


}
