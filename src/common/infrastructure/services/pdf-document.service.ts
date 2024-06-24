import { Injectable } from '@nestjs/common';
import { PDFDocument } from 'pdf-lib';
import { IPdfService } from '../../application/services/pdf-service';


@Injectable()
export class PDFDocumentService implements IPdfService<PDFDocument> {
    async load(file: Express.Multer.File | any): Promise<PDFDocument> {
        return PDFDocument.load(await file.buffer);
    }

}
