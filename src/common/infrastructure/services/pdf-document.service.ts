import { Injectable } from '@nestjs/common';
import * as fs from 'fs/promises';
import { PDFDocument } from 'pdf-lib';
import { IPdfService } from '../../application/services/pdf-service';


@Injectable()
export class PDFDocumentService implements IPdfService<PDFDocument> {
    async load(filePath: string): Promise<PDFDocument> {
        return PDFDocument.load(await fs.readFile(filePath));
    }

}
